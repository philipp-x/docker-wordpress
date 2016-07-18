<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme and one of the
 * two required files for a theme (the other one being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * For example, it puts together the home page when no home.php file exists.
 */
get_header(); ?>

            <div class="starter-template">
                <h1><?php _e( 'Hello, world!', 'mytheme' ); ?></h1>
            </div>

<?php get_footer(); ?>