(function () {
	'use strict';

	var menuButton = document.querySelector('.fm-menu-toggle');
	var menu = document.querySelector('.fm-links');
	if (menuButton && menu) {
		menuButton.addEventListener('click', function () {
			var open = menu.classList.toggle('open');
			menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
		});
		menu.querySelectorAll('a').forEach(function (link) {
			link.addEventListener('click', function () {
				menu.classList.remove('open');
				menuButton.setAttribute('aria-expanded', 'false');
			});
		});
	}

	var search = document.querySelector('.fm-search input');
	var cards = Array.prototype.slice.call(document.querySelectorAll('.fm-brand-card'));
	var chips = Array.prototype.slice.call(document.querySelectorAll('.fm-chip'));
	var activeFilter = 'all';
	function filterCards() {
		var query = search ? search.value.trim().toLowerCase() : '';
		cards.forEach(function (card) {
			var title = card.querySelector('h3').textContent.toLowerCase();
			var text = card.textContent.toLowerCase();
			var category = /coffee/.test(text) ? 'coffee' : (/burger|taco|chicken|fries|sub|pizza/.test(text) ? 'fast food' : 'casual dining');
			var matchesText = !query || title.indexOf(query) !== -1;
			var matchesType = activeFilter === 'all' || category === activeFilter;
			card.hidden = !(matchesText && matchesType);
		});
	}
	if (search) search.addEventListener('input', filterCards);
	chips.forEach(function (chip) {
		chip.addEventListener('click', function () {
			chips.forEach(function (item) { item.classList.remove('active'); });
			chip.classList.add('active');
			var label = chip.textContent.trim().toLowerCase();
			activeFilter = label === 'all restaurants' ? 'all' : label;
			filterCards();
		});
	});
	document.querySelectorAll('[data-fm-consent-settings]').forEach(function (link) {
		link.addEventListener('click', function (event) {
			if (window.googlefc && window.googlefc.callbackQueue && typeof window.googlefc.showRevocationMessage === 'function') {
				event.preventDefault();
				window.googlefc.callbackQueue.push(window.googlefc.showRevocationMessage);
			}
		});
	});

	var age = document.getElementById('fm-age');
	var heightFt = document.getElementById('fm-height-ft');
	var heightIn = document.getElementById('fm-height-in');
	var heightCm = document.getElementById('fm-height-cm');
	var weightUs = document.getElementById('fm-weight-us');
	var weightKg = document.getElementById('fm-weight-kg');
	var activity = document.getElementById('fm-activity');
	var goal = document.getElementById('fm-goal');
	var mealCalories = document.getElementById('fm-meal-calories');
	var unit = 'us';
	var equationSex = 'female';
	var macroStyle = 'balanced';
	var latestTarget = 0;
	var calorieResult = document.getElementById('fm-calorie-result');
	var saveToggle = document.getElementById('fm-save-preferences');
	var clearSaved = document.getElementById('fm-clear-preferences');
	var saveStatus = document.getElementById('fm-save-status');
	var storageKey = 'foodmenu-calculator-settings-v1';
	if (!calorieResult) return;
	function updateMacros(target) {
		var splits = {
			balanced: { carbs: .50, protein: .20, fat: .30 },
			protein: { carbs: .40, protein: .30, fat: .30 },
			'lower-carb': { carbs: .30, protein: .25, fat: .45 }
		};
		var split = splits[macroStyle];
		document.getElementById('fm-carb-result').textContent = Math.round(target * split.carbs / 4) + 'g';
		document.getElementById('fm-macro-protein-result').textContent = Math.round(target * split.protein / 4) + 'g';
		document.getElementById('fm-fat-result').textContent = Math.round(target * split.fat / 9) + 'g';
	}
	function savePreferences() {
		if (!saveToggle || !saveToggle.checked) return;
		try {
			localStorage.setItem(storageKey, JSON.stringify({
				enabled: true, unit: unit, sex: equationSex, age: age.value,
				heightFt: heightFt.value, heightIn: heightIn.value, heightCm: heightCm.value,
				weightUs: weightUs.value, weightKg: weightKg.value,
				activity: activity.value, goal: goal.value, macroStyle: macroStyle
			}));
			clearSaved.hidden = false;
			saveStatus.textContent = 'Settings saved in this browser.';
		} catch (error) {
			saveStatus.textContent = 'Your browser could not save these settings.';
		}
	}
	function updateMealComparison() {
		var a = Number(document.getElementById('fm-compare-a').value);
		var b = Number(document.getElementById('fm-compare-b').value);
		var output = document.getElementById('fm-compare-result');
		if (!a || !b || a < 0 || b < 0) {
			output.textContent = 'Add both calorie counts to compare.';
			return;
		}
		if (a === b) output.textContent = 'Both choices have the same listed calories: ' + a.toLocaleString('en-US') + ' cal.';
		else output.textContent = 'Choice ' + (a < b ? 'A' : 'B') + ' has ' + Math.abs(a - b).toLocaleString('en-US') + ' fewer calories.';
	}
	function updateMealCheck(target) {
		if (!mealCalories) return;
		if (!mealCalories.value) {
			document.getElementById('fm-meal-feedback').textContent = 'Enter menu calories to see how they fit your daily target.';
			document.getElementById('fm-meal-meter-fill').style.width = '0';
			document.querySelector('.fm-meal-meter').setAttribute('aria-valuenow', '0');
			return;
		}
		var meal = Number(mealCalories.value);
		var percent = Math.round(meal / target * 100);
		var remaining = target - meal;
		var feedback = document.getElementById('fm-meal-feedback');
		var meter = document.getElementById('fm-meal-meter-fill');
		if (remaining >= 0) {
			feedback.textContent = meal.toLocaleString('en-US') + ' calories is ' + percent + '% of your daily target, with ' + remaining.toLocaleString('en-US') + ' left.';
		} else {
			feedback.textContent = meal.toLocaleString('en-US') + ' calories is ' + percent + '% of your daily target (' + Math.abs(remaining).toLocaleString('en-US') + ' over it).';
		}
		meter.style.width = Math.min(percent, 100) + '%';
		meter.parentElement.setAttribute('aria-valuenow', String(Math.min(percent, 100)));
	}
	function updateCalories() {
		if (!age || !activity || !goal || !calorieResult) return;
		var years = Number(age.value);
		var centimeters = unit === 'us' ? ((Number(heightFt.value) * 12 + Number(heightIn.value)) * 2.54) : Number(heightCm.value);
		var kilograms = unit === 'us' ? Number(weightUs.value) * 0.45359237 : Number(weightKg.value);
		var invalid = !years || !centimeters || !kilograms || years < 19 || years > 78 || centimeters < 122 || centimeters > 213 || kilograms < 32 || kilograms > 227;
		document.getElementById('fm-calc-error').hidden = !invalid;
		if (invalid) {
			latestTarget = 0;
			['fm-calorie-result', 'fm-maintenance-result', 'fm-resting-result', 'fm-protein-result', 'fm-breakfast-result', 'fm-lunch-result', 'fm-dinner-result', 'fm-snack-result'].forEach(function (id) { document.getElementById(id).textContent = '—'; });
			document.getElementById('fm-calorie-range').textContent = '—';
			updateMacros(0);
			document.getElementById('fm-meal-feedback').textContent = 'Enter valid age, height and weight to check a meal against your target.';
			document.getElementById('fm-meal-meter-fill').style.width = '0';
			return;
		}
		var offset = equationSex === 'male' ? 5 : -161;
		var resting = 10 * kilograms + 6.25 * centimeters - 5 * years + offset;
		var maintenance = Math.round((resting * Number(activity.value)) / 10) * 10;
		var target = Math.max(0, maintenance + Number(goal.value));
		latestTarget = target;
		var low = Math.round(target * .9 / 10) * 10;
		var high = Math.round(target * 1.1 / 10) * 10;
		var breakfast = Math.round(target * .25);
		var lunch = Math.round(target * .35);
		var dinner = Math.round(target * .30);
		calorieResult.textContent = target.toLocaleString('en-US');
		document.getElementById('fm-maintenance-result').textContent = maintenance.toLocaleString('en-US');
		document.getElementById('fm-resting-result').textContent = Math.round(resting).toLocaleString('en-US');
		document.getElementById('fm-protein-result').textContent = Math.round(kilograms * .8) + ' g';
		document.getElementById('fm-calorie-range').textContent = low.toLocaleString('en-US') + '–' + high.toLocaleString('en-US') + ' cal';
		document.getElementById('fm-breakfast-result').textContent = breakfast.toLocaleString('en-US');
		document.getElementById('fm-lunch-result').textContent = lunch.toLocaleString('en-US');
		document.getElementById('fm-dinner-result').textContent = dinner.toLocaleString('en-US');
		document.getElementById('fm-snack-result').textContent = Math.max(0, target - breakfast - lunch - dinner).toLocaleString('en-US');
		updateMacros(target);
		updateMealCheck(target);
	}
	function setUnit(nextUnit) {
		if (nextUnit === unit) return;
		if (nextUnit === 'metric') {
			heightCm.value = Math.round((Number(heightFt.value) * 12 + Number(heightIn.value)) * 2.54);
			weightKg.value = (Number(weightUs.value) * 0.45359237).toFixed(1);
		} else {
			var totalInches = Number(heightCm.value) / 2.54;
			var feet = Math.floor(totalInches / 12);
			heightFt.value = feet;
			heightIn.value = Math.round(totalInches - feet * 12);
			if (Number(heightIn.value) === 12) { heightFt.value = feet + 1; heightIn.value = 0; }
			weightUs.value = Math.round(Number(weightKg.value) / 0.45359237);
		}
		unit = nextUnit;
		document.querySelector('.fm-us-height').hidden = unit !== 'us';
		document.querySelector('.fm-metric-height').hidden = unit !== 'metric';
		document.querySelector('.fm-us-weight').hidden = unit !== 'us';
		document.querySelector('.fm-metric-weight').hidden = unit !== 'metric';
		document.querySelectorAll('[data-unit]').forEach(function (button) {
			var selected = button.dataset.unit === unit;
			button.classList.toggle('active', selected);
			button.setAttribute('aria-pressed', selected ? 'true' : 'false');
		});
		updateCalories();
		savePreferences();
	}
	document.querySelectorAll('[data-unit]').forEach(function (button) {
		button.addEventListener('click', function () { setUnit(button.dataset.unit); });
	});
	document.querySelectorAll('[data-sex]').forEach(function (button) {
		button.addEventListener('click', function () {
			equationSex = button.dataset.sex;
			document.querySelectorAll('[data-sex]').forEach(function (option) {
				var selected = option === button;
				option.classList.toggle('active', selected);
				option.setAttribute('aria-pressed', selected ? 'true' : 'false');
			});
			updateCalories();
			savePreferences();
		});
	});
	[age, heightFt, heightIn, heightCm, weightUs, weightKg, activity, goal].forEach(function (field) {
		if (field) field.addEventListener('input', function () { updateCalories(); savePreferences(); });
		if (field) field.addEventListener('change', function () { updateCalories(); savePreferences(); });
	});
	if (mealCalories) mealCalories.addEventListener('input', updateCalories);
	document.querySelectorAll('[data-macro]').forEach(function (button) {
		button.addEventListener('click', function () {
			macroStyle = button.dataset.macro;
			document.querySelectorAll('[data-macro]').forEach(function (option) {
				var selected = option === button;
				option.classList.toggle('active', selected);
				option.setAttribute('aria-pressed', selected ? 'true' : 'false');
			});
			updateMacros(latestTarget);
			savePreferences();
		});
	});
	document.getElementById('fm-use-meal-total').addEventListener('click', function () {
		var parts = ['fm-builder-entree', 'fm-builder-side', 'fm-builder-drink'];
		var total = parts.reduce(function (sum, id) { return sum + Math.max(0, Number(document.getElementById(id).value) || 0); }, 0);
		var status = document.getElementById('fm-builder-status');
		if (!total) {
			status.textContent = 'Add at least one item calorie count first.';
			return;
		}
		mealCalories.value = total;
		status.textContent = 'Meal total: ' + total.toLocaleString('en-US') + ' calories.';
		updateCalories();
	});
	['fm-compare-a', 'fm-compare-b'].forEach(function (id) {
		document.getElementById(id).addEventListener('input', updateMealComparison);
	});
	if (saveToggle) {
		saveToggle.addEventListener('change', function () {
			if (saveToggle.checked) savePreferences();
			else {
				try { localStorage.removeItem(storageKey); } catch (error) { /* Storage may be unavailable. */ }
				clearSaved.hidden = true;
				saveStatus.textContent = 'Saved settings removed.';
			}
		});
	}
	if (clearSaved) clearSaved.addEventListener('click', function () {
		try { localStorage.removeItem(storageKey); } catch (error) { /* Storage may be unavailable. */ }
		saveToggle.checked = false;
		clearSaved.hidden = true;
		saveStatus.textContent = 'Saved settings removed.';
	});
	try {
		var saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
		if (saved && saved.enabled) {
			if (saved.unit === 'metric') setUnit('metric');
			age.value = saved.age || age.value;
			heightFt.value = saved.heightFt || heightFt.value;
			heightIn.value = saved.heightIn || heightIn.value;
			heightCm.value = saved.heightCm || heightCm.value;
			weightUs.value = saved.weightUs || weightUs.value;
			weightKg.value = saved.weightKg || weightKg.value;
			activity.value = saved.activity || activity.value;
			goal.value = saved.goal || '0';
			equationSex = saved.sex === 'male' ? 'male' : 'female';
			document.querySelectorAll('[data-sex]').forEach(function (button) {
				var selected = button.dataset.sex === equationSex;
				button.classList.toggle('active', selected);
				button.setAttribute('aria-pressed', selected ? 'true' : 'false');
			});
			if (saved.macroStyle && ['balanced', 'protein', 'lower-carb'].indexOf(saved.macroStyle) !== -1) {
				macroStyle = saved.macroStyle;
				document.querySelectorAll('[data-macro]').forEach(function (button) {
					var selected = button.dataset.macro === macroStyle;
					button.classList.toggle('active', selected);
					button.setAttribute('aria-pressed', selected ? 'true' : 'false');
				});
			}
			saveToggle.checked = true;
			clearSaved.hidden = false;
			saveStatus.textContent = 'Saved settings loaded from this browser.';
		}
	} catch (error) { /* Keep the calculator usable when browser storage is disabled. */ }
	updateCalories();
}());
