<?php get_header(); ?>
<main class="fm-section fm-page-content">
	<div class="fm-wrap">
		<?php while ( have_posts() ) : the_post(); ?>
			<article <?php post_class( 'fm-page-article' ); ?>>
				<header class="fm-section-head"><h1><?php the_title(); ?></h1></header>
				<div class="fm-prose"><?php the_content(); ?></div>
			</article>
		<?php endwhile; ?>
	</div>
</main>
<?php get_footer(); ?>
