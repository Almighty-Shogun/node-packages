<template>
    <Parameters v-if="frontmatter.params"/>
    <Returns v-if="frontmatter.returns"/>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import Returns from './Returns.vue'
import Parameters from './Parameters.vue'

const { frontmatter } = useData();
</script>
