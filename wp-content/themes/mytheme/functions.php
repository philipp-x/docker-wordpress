<?php
/**
 * mytheme functions and definitions
 *
 * Sets up the theme and provides some helper functions, which are used in the
 * theme as custom template tags. Others are attached to action and filter
 * hooks in WordPress to change core functionality.
 */

/**
 * Theme MO location
 */
load_theme_textdomain( 'mytheme', get_template_directory().'/languages' );
?>