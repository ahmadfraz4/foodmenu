<?php get_header(); ?>
<main class="fm-section fm-page-content">
	<div class="fm-wrap">
		<article class="fm-page-article fm-privacy-page">
			<header class="fm-section-head"><span class="fm-kicker">Your information</span><h1><?php echo esc_html( get_the_title() ?: 'Privacy policy' ); ?></h1><p>Last updated <?php echo esc_html( get_the_modified_date() ); ?></p></header>
			<div class="fm-prose">
				<?php while ( have_posts() ) : the_post(); the_content(); endwhile; ?>
				<section id="menu-information"><h2>Information on this site</h2><p><?php echo esc_html( get_bloginfo( 'name' ) ); ?> publishes restaurant menu and nutrition information for general reference. Menu details, prices, ingredients and nutrition values may change. Confirm current information with the restaurant. Calculator estimates and menu nutrition details are informational and are not medical advice.</p></section>
				<section id="calculator-data"><h2>Calorie calculator</h2><p>The calculator runs in your browser. If you choose “Remember my settings on this browser,” it stores the calculator inputs in this browser’s local storage so they can be restored on a later visit. Those calculator inputs are not sent to our WordPress site by the calculator. Use “Clear saved settings” in the calculator or clear this site’s browser storage to remove them.</p></section>
				<section id="cookies"><h2>Cookies, advertising and consent</h2><p>WordPress and any services enabled on this site may use cookies or similar technologies for site operation, security, measurement and advertising. If Google AdSense is enabled, Google and its advertising partners may use cookies or other identifiers to deliver, measure and personalize ads, subject to the choices and settings shown to you.</p><p>When Google’s consent message is configured for this site, visitors in the European Economic Area, the United Kingdom and Switzerland can be shown the applicable message. Use the <a href="<?php echo esc_url( ( get_privacy_policy_url() ?: home_url( '/privacy-policy/' ) ) . '#cookies' ); ?>" data-fm-consent-settings>Privacy &amp; cookie settings</a> link in the footer to revisit your choice when the consent service is available. Learn more about <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener">Google’s advertising technologies</a> and <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google’s privacy policy</a>.</p></section>
				<section><h2>Your choices and questions</h2><p>You can manage cookies through your browser settings. If you have a privacy question or request, contact the site operator at <a href="mailto:<?php echo esc_attr( antispambot( get_option( 'admin_email' ) ) ); ?>"><?php echo esc_html( antispambot( get_option( 'admin_email' ) ) ); ?></a>.</p></section>
				<?php if ( current_user_can( 'edit_pages' ) ) : ?>
					<aside class="fm-policy-editor-note"><strong>Before publishing:</strong> review this policy for the services actually installed on the site, identify the legal website operator and business address, confirm the privacy contact email, and describe any analytics, advertising, or forms that collect data. The AdSense privacy message must also be configured in your AdSense account.</aside>
				<?php endif; ?>
			</div>
		</article>
	</div>
</main>
<?php get_footer(); ?>
