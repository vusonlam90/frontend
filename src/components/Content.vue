<template>
    <section>
        <div class="hero hero-home simplified">
            <div class="hero-home-bg-cover"></div>
            <div class="container container-simplified">
                <div class="row row-simplified">
                    <h1>Âm nhạc cho mọi người.</h1>
                    <h4>Hàng triệu bài hát. Không cần thẻ tín dụng.</h4>
                    <a href="/vn-vi/download/" id="generic-btn-premium" role="button" data-tracking="{&quot;category&quot;: &quot;home (offer)&quot;, &quot;action&quot;: &quot;premium&quot;}" class="btn btn-green btn-simplified js-goto-signup js-button-hero-get-free">TẢI SPOTIFY MIỄN PHÍ</a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'Content',
        props: {
            msg: String
        }
    }
</script>

<style scoped>

@media (max-width: 991px) {
    .index-homepage .simplified .hero-home-bg-cover {
        width: 878px;
        height: 676px;
    background: url('../assets/images/hero-burst-mobile.svg') no-repeat;
        -webkit-transform: translate(-50%, 10%);
        -ms-transform: translate(-50%, 10%);
        transform: translate(-50%, 10%);
    }
}
@media (min-width: 992px) {
    .index-homepage .simplified .hero-home-bg-cover {
        width: 1610px;
        height: 1523px;
    background: url('../assets/images/hero-burst.svg') no-repeat;
        background-position: top -410px center;
        -webkit-transform: translate(-50%, 0%);
        -ms-transform: translate(-50%, 0%);
        transform: translate(-50%, 0%);
    }
}
</style>
