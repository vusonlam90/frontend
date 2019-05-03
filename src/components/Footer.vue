<template>

    <footer role="contentinfo" class="footer footer-default ">
        <div class="container">
            <nav class="row">

                <div class="col-xs-12 col-md-2">
                    <div class="footer-logo">
                        <a href="/vn-vi/">Spotify</a>
                    </div>
                </div>

                <div class="col-xs-6 col-sm-4 col-md-2">
                    <h3 class="nav-title">Công ty</h3>
                    <ul class="nav">
                        <li><a href="/vn-vi/about-us/contact/" id="nav-link-about" data-ga-category="menu" data-ga-action="about">Giới thiệu</a></li>
                        <li><a href="https://www.spotifyjobs.com/" id="nav-link-jobs" data-ga-category="menu" data-ga-action="jobs">Việc làm</a></li>
                        <li><a href="https://newsroom.spotify.com/" id="nav-link-press" data-ga-category="menu" data-ga-action="press">For the Record</a></li>
                    </ul>
                </div>

                <div class="col-xs-6 col-sm-4 col-md-2">
                    <h3 class="nav-title">Cộng đồng</h3>
                    <ul class="nav">
                        <li><a href="https://artists.spotify.com/" id="nav-link-artists" data-ga-category="menu" data-ga-action="artists">Dành cho các Nghệ sĩ</a></li>
                        <li><a href="https://developer.spotify.com/" id="nav-link-developers" data-ga-category="menu" data-ga-action="developers">Nhà phát triển</a></li>
                        <li><a href="/vn-vi/brands/" id="nav-link-brands" data-ga-category="menu" data-ga-action="brands">Nhãn hiệu</a></li>
                        <li><a href="https://investors.spotify.com/" id="nav-link-investors" data-ga-category="menu" data-ga-action="investors">Nhà đầu tư</a></li>
                        <li><a href="https://spotifyforvendors.com/" id="nav-link-vendors" data-ga-category="menu" data-ga-action="vendors">Nhà cung cấp</a></li>
                    </ul>
                </div>

                <div class="col-xs-6 col-sm-4 col-md-2">
                    <h3 class="nav-title">Liên kết hữu ích</h3>
                    <ul class="nav">
                        <li>
                            <a href="https://support.spotify.com/?utm_source=www.spotify.com&amp;utm_medium=www_footer" id="nav-link-help" data-ga-category="menu" data-ga-action="help">Trợ giúp</a>
                        </li>
                        <li class="hidden-xs ">
                            <a href="/vn-vi/redirect/webplayerlink/?utm_medium=www_footer" id="nav-link-play" data-ga-category="menu" data-ga-action="play">Trình phát Web</a>
                        </li>
                        <li class="visible-xs hidden-sm ">
                            <a href="/vn-vi/free/?utm_medium=www_footer" id="nav-link-free" data-ga-category="menu" data-ga-action="free">Ứng dụng Di động Miễn phí</a>
                        </li>
                    </ul>
                </div>

                <div class="col-xs-12 col-md-4 col-social">
                    <ul class="nav">
                        <li>
                            <a href="http://instagram.com/spotify">
                                <svg class="social-icon"><use xlink:href="#instagram-icon"><svg></svg></use></svg><span class="social-text">Instagram</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com/spotify">
                                <svg class="social-icon"><use xlink:href="#twitter-icon"><svg></svg></use></svg><span class="social-text">Twitter</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/Spotify">
                                <svg class="social-icon"><use xlink:href="#facebook-icon"><svg></svg></use></svg><span class="social-text">Facebook</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <nav class="row row-small">
                <div class="col-xs-9">
                    <ul class="nav nav-small">
                        <li><a href="/vn-vi/legal/">Pháp lý</a></li>
                        <li><a href="/vn-vi/privacy/">Trung tâm bảo mật</a></li>
                        <li><a href="/legal/privacy-policy/">Chính sách Quyền riêng tư</a></li>
                        <li><a href="/vn-vi/legal/cookies-policy/">Cookies</a></li>
                        <li><a href="/vn-vi/legal/privacy-policy/#s3">Giới thiệu Quảng cáo</a></li>
                    </ul>
                </div>

                <div class="col-xs-3 text-right">
                    <a class="market" href="/vn-vi/select-your-country/" title="Nhấp vào để thay đổi">
                        <div class="media">
                            <div class="media-body media-middle">Việt Nam (Tiếng Việt)</div>
                            <div class="media-right media-middle">
                                <span class="media-object flag-icon flag-icon-vn-vi"></span>
                            </div>
                        </div>
                    </a>
                    <small class="copyright">© 2019 Spotify AB</small>
                </div>
            </nav>
        </div>
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
