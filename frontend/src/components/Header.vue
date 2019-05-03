<template>
<header id="js-navbar" class="navbar navbar-default navbar-semi-transparent navbar-highlight-green navbar-static-top" role="banner">
    <div id="js-message-bars">

        <div id="js-message-bar-multi-language" class="alert alert-info alert-dismissible" role="alert" data-alternative-market="vn-en">
            <div class="container">
                <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Đóng</span></button>
                This website is in Vietnamese. <a class="multi-language-link alert-link" href="/vn-en/">Switch to English</a>.
            </div>
        </div>
    </div>

    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="sidepanel" data-target="#navbar-nav">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a href="/vn-vi/account/overview/" class="user-link hidden">
                <div class="user-icon-container img-circle navbar-user-img">
                    <svg class="user-icon"><use xlink:href="#user-icon"></use></svg>
                </div>
            </a>
            <a class="navbar-brand" href="/vn-vi/" data-tracking="{&quot;category&quot;: &quot;menu&quot;, &quot;action&quot;: &quot;spotify-logo&quot;}">
                <span class="navbar-logo">Spotify</span>
            </a>
        </div>
        <nav class="collapse navbar-collapse" id="navbar-nav" role="navigation">
            <ul class="nav navbar-nav navbar-right nav-main">
                <li>
                    <a href="/vn-vi/premium/?checkout=false" id="nav-link-premium" data-ga-category="menu" data-ga-action="premium">Premium</a>
                </li>
                <li>
                    <a href="https://support.spotify.com/?utm_source=www.spotify.com&amp;utm_medium=www_header" id="nav-link-help" data-ga-category="menu" data-ga-action="help">Trợ giúp</a>
                </li>
                <li>
                    <a href="/vn-vi/download/" id="nav-link-download" class="js-get-spotify js-gtm-event" data-ga-category="menu" data-ga-action="download" data-gtm-event-name="download_spotify_button_clicked" data-tracking="{&quot;category&quot;: &quot;download&quot;, &quot;action&quot;: &quot;download start&quot;, &quot;label&quot;: &quot;download-navbar&quot;}">Tải xuống</a>
                </li>
                <li role="separator" class="divider"></li>
                <li class="alternate sidepanel-item-small ">
                    <a href="/vn-vi/signup/" id="nav-link-sign-up" data-ga-category="menu" data-ga-action="sign-up">Đăng ký</a>
                </li>
                <li class="alternate sidepanel-item-small">
                    <a href="/vn-vi/login/" id="header-login-link" class="user-link" data-tracking="{&quot;category&quot;: &quot;menu&quot;, &quot;action&quot;: &quot;log-in&quot;}">
                        <span class="user-text navbar-user-text">Đăng nhập</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</header>
</template>

<script>
    export default {
        name: 'Header',
        props: {
            msg: String
        }
    }
</script>
