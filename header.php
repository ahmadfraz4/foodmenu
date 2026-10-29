<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="fm-header">
	<div class="fm-wrap fm-nav">
		<a class="fm-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="<?php bloginfo( 'name' ); ?> home"><span class="fm-mark">FM</span><span>USA Food Menu</span></a>
		<button class="fm-menu-toggle" aria-label="Open navigation" aria-expanded="false">☰</button>
		<nav class="fm-links" aria-label="Main navigation">
			<a href="#restaurants">Restaurants</a><a href="#calories">Calorie calculator</a><a href="#food-types">Food types</a><a href="#about">About</a><a href="#faq">FAQ</a>
		</nav>
		<div class="fm-actions"><a class="fm-btn fm-btn-ghost" href="#calories">Check calories</a><a class="fm-btn fm-btn-primary" href="#restaurants">Browse menus <span aria-hidden="true">→</span></a></div>
	</div>
</header>
