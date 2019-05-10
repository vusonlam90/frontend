<template>
    <header class="main-header">
        <div class="top-bar">
            <b-container>
                <b-row>
                    <b-col class="language" cols="6" align="left">
                        This website is in Vietnamese. <b-link href="#">Switch to English.</b-link>
                    </b-col>
                    <b-col class="close-btn" cols="6" align="right">
                        <b-link href="#">×</b-link>
                    </b-col>
                </b-row>
            </b-container>
        </div>

        <b-container class="nav-menu">
            <b-row>
                <b-col cols="4">
                    <b-nav class="navbar-left" align="left">
                        <b-nav-item active><span class="navbar-logo">Spotify</span></b-nav-item>
                    </b-nav>
                </b-col>
                <b-col cols="8">
                    <b-nav class="navbar-right" align="right">
                        <b-nav-item active>Premium</b-nav-item>
                        <b-nav-item>Trợ giúp</b-nav-item>
                        <b-nav-item>Tải xuống</b-nav-item>
                        <b-nav-item class="divider"></b-nav-item>
                        <b-nav-item>Đăng ký</b-nav-item>
                        <b-nav-item>Đăng nhập</b-nav-item>
                    </b-nav>
                </b-col>
                <span class="toggle-menu">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </span>
            </b-row>
        </b-container>
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
