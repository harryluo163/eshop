<template>
    <div class="wrapper">
        <t-header></t-header>
        <router-view></router-view>
        <t-footer></t-footer>
    </div>
</template>
<script>
    import tHeader from '../../components/shop/header'
    import tFooter from "../../components/shop/footer";
    export default {
        components: {
            tHeader,
            tFooter
        }
    };
</script>