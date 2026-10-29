<?php
/** Theme setup and assets. */
function foodmenu_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
	register_nav_menus( array( 'primary' => __( 'Primary Menu', 'foodmenu' ) ) );
}
add_action( 'after_setup_theme', 'foodmenu_setup' );

function foodmenu_assets() {
	wp_enqueue_style( 'foodmenu-style', get_stylesheet_uri(), array(), '1.0.0' );
	wp_enqueue_script( 'foodmenu-script', get_template_directory_uri() . '/assets/js/theme.js', array(), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'foodmenu_assets' );

function foodmenu_brand_cards() {
	return array(
		array( 'T', 'Taco Bell', 'Tacos, burritos & value favorites', '#702b83' ), array( 'S', 'Starbucks', 'Coffee, espresso & bakery', '#00754a' ), array( 'W', 'Wendy’s', 'Burgers, chicken & fresh sides', '#d82942' ), array( 'C', 'Chick-fil-A', 'Chicken sandwiches & more', '#c41230' ),
		array( 'M', 'McDonald’s', 'Burgers, fries & breakfast', '#d91f26' ), array( 'F', 'Five Guys', 'Burgers, dogs & hand-cut fries', '#b11f2e' ), array( 'P', 'Popeyes', 'Louisiana-style chicken', '#d85c20' ), array( 'D', 'Dunkin’', 'Coffee, donuts & breakfast', '#ef6c24' ),
		array( 'C', 'Chipotle', 'Burritos, bowls & tacos', '#a13c24' ), array( 'O', 'Olive Garden', 'Italian favorites & soup', '#487b3a' ), array( 'S', 'Sonic Drive-In', 'Burgers, drinks & snacks', '#087eb2' ), array( 'B', 'Burger King', 'Flame-grilled burgers', '#d9432c' ),
		array( 'A', 'Applebee’s', 'Neighborhood grill & bar', '#bd202e' ), array( 'P', 'P.F. Chang’s', 'Asian-inspired dining', '#b3212d' ), array( 'R', 'Red Lobster', 'Seafood & coastal favorites', '#a92535' ), array( 'C', 'Cracker Barrel', 'Country cooking & comfort food', '#996b36' ),
		array( 'W', 'Whataburger', 'Made-to-order burgers', '#ee671b' ), array( 'S', 'Subway', 'Subs, salads & wraps', '#16864a' ), array( 'D', 'IHOP', 'Pancakes, breakfast & more', '#1767a2' ), array( 'P', 'Panera Bread', 'Soups, salads & bakery', '#b63732' ),
		array( 'C', 'Culver’s', 'ButterBurgers & frozen custard', '#2a5d8b' ), array( 'A', 'Arby’s', 'Roast beef & sandwiches', '#9e1d27' ), array( 'J', 'Jersey Mike’s', 'Fresh sliced subs', '#c82032' ), array( 'Z', 'Zaxby’s', 'Chicken, wings & sauces', '#c63e2c' ),
	);
}
