<template>
    <footer>
        <p>©{{ currentYear }} Jeremy Erik Leong. This project was developed using
            <a href="https://vuejs.org/" target="_blank"> Vue.js</a>, 
            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank"> CSS</a>, 
            and deployed via 
            <a href="https://www.netlify.com/" target="_blank"> Netlify</a>.
         </p>
    </footer> 
</template>

<script setup>
    const currentYear = new Date().getFullYear();
</script>

<style scoped>
    footer {
        text-align: center;
        padding: 1rem;
        font-size: 0.9rem;
        color: #fff;

        p {
            margin-block: 0;
        }
    }

    footer a {
        color: #edc08c;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
</style>