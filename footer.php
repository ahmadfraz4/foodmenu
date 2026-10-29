<?php
$fm_privacy_url = get_privacy_policy_url();
if ( ! $fm_privacy_url ) { $fm_privacy_url = home_url( '/privacy-policy/' ); }
$fm_contact_page = get_page_by_path( 'contact' );
$fm_terms_page = get_page_by_path( 'terms' );
?>
<footer class="fm-footer">
	<div class="fm-wrap">
		<div class="fm-footer-grid">
			<div><a class="fm-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>"><span class="fm-mark">FM</span><span>USA Food Menu</span></a><p>Restaurant menus and nutrition details, gathered in one easy place to help you choose what to enjoy.</p></div>
			<div class="fm-footer-col"><h4>Popular menus</h4><a href="#restaurants">McDonald’s</a><a href="#restaurants">Taco Bell</a><a href="#restaurants">Chick-fil-A</a><a href="#restaurants">Wendy’s</a></div>
			<div class="fm-footer-col"><h4>Explore</h4><a href="#food-types">Burgers & fries</a><a href="#food-types">Coffee & drinks</a><a href="#food-types">Chicken</a><a href="#food-types">Desserts</a></div>
			<div class="fm-footer-col"><h4>Helpful links</h4><a href="#calories">Calorie calculator</a><a href="#about">How we check menus</a><a href="#faq">Common questions</a></div>
			<div class="fm-footer-col"><h4>Information</h4><a href="<?php echo esc_url( home_url( '/#about' ) ); ?>">About us</a><?php if ( $fm_contact_page ) : ?><a href="<?php echo esc_url( get_permalink( $fm_contact_page ) ); ?>">Contact</a><?php endif; ?><a href="<?php echo esc_url( $fm_privacy_url ); ?>">Privacy policy</a><a href="<?php echo esc_url( $fm_privacy_url . '#menu-information' ); ?>">Menu information</a><a href="<?php echo esc_url( $fm_privacy_url . '#cookies' ); ?>">Cookie information</a><?php if ( $fm_terms_page ) : ?><a href="<?php echo esc_url( get_permalink( $fm_terms_page ) ); ?>">Terms of use</a><?php endif; ?><a href="<?php echo esc_url( $fm_privacy_url . '#cookies' ); ?>" data-fm-consent-settings>Privacy &amp; cookie settings</a></div>
		</div>
		<div class="fm-footer-bottom"><span>© <?php echo esc_html( wp_date( 'Y' ) ); ?> USA Food Menu. All rights reserved.</span><span>Menu information can change. Please confirm details with the restaurant.</span></div>
	</div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
