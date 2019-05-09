<template>
    <footer>
        <b-container>
            <b-row>
                <b-col cols="2">
                    <b-link><span class="navbar-logo">Spotify</span></b-link>
                </b-col>
                <b-col cols="2">
                    <h3>Công ty</h3>
                    <b-nav>
                        <b-nav-item>Giới thiệu</b-nav-item>
                        <b-nav-item>Việc làm</b-nav-item>
                        <b-nav-item>For the Record</b-nav-item>
                    </b-nav>
                </b-col>
                <b-col cols="2">
                    <h3>Cộng đồng</h3>
                    <b-nav>
                        <b-nav-item>Dành cho các Nghệ sĩ</b-nav-item>
                        <b-nav-item>Nhà phát triển</b-nav-item>
                        <b-nav-item>Nhãn hiệu</b-nav-item>
                        <b-nav-item>Nhà đầu tư</b-nav-item>
                        <b-nav-item>Nhà cung cấp</b-nav-item>
                    </b-nav>
                </b-col>
                <b-col cols="2">
                    <h3>Liên kết hữu ích</h3>
                    <b-nav>
                        <b-nav-item>Trợ giúp</b-nav-item>
                        <b-nav-item>Trình phát web</b-nav-item>
                    </b-nav>
                </b-col>
                <b-col cols="4" align="right" class="col-social">
                    <b-nav>
                        <b-nav-item><svg class="social-icon"><use xlink:href="#instagram-icon"><svg></svg></use></svg><span class="social-text">Instagram</span></b-nav-item>
                        <b-nav-item><svg class="social-icon"><use xlink:href="#twitter-icon"><svg></svg></use></svg><span class="social-text">Twitter</span></b-nav-item>
                        <b-nav-item><svg class="social-icon"><use xlink:href="#facebook-icon"><svg></svg></use></svg><span class="social-text">Facebook</span></b-nav-item>
                    </b-nav>
                </b-col>
            </b-row>

            <b-row class="policy">
                <b-col cols="9">
                    <b-nav>
                        <b-nav-item>Pháp lý</b-nav-item>
                        <b-nav-item>Trung tâm bảo mật</b-nav-item>
                        <b-nav-item>Chính sách Quyền riêng tư</b-nav-item>
                        <b-nav-item>Cookies</b-nav-item>
                        <b-nav-item>Giới thiệu Quảng cáo</b-nav-item>
                    </b-nav>
                </b-col>
                <b-col cols="3" align="right">
                    <b-link class="lang-footer">Việt Nam (Tiếng Việt)<span class="flag-vn"></span></b-link>
                    <small class="copyright">© 2019 Spotify AB</small>
                </b-col>
            </b-row>
        </b-container>
    </footer>
</template>

<script>
    export default {
        name: 'Footer',
        props: {
            msg: String
        }
    }
</script>
