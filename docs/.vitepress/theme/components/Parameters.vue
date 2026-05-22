<template>
    <section v-if="parameters.length" class="frontmatter-docs__section">
        <h2 id="parameters">Parameters</h2>

        <div class="frontmatter-docs__table-wrap">
            <table class="frontmatter-docs__table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th v-if="hasType">Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="parameter in parameters" :key="parameter.name">
                        <td>
                            <code>{{ parameter.name }}</code>
                        </td>
                        <td v-if="hasType">
                            <code v-if="parameter.type">{{ parameter.type }}</code>
                        </td>
                        <td>
                            <span
                                v-for="(part, index) in parseInline(parameter.description)"
                                :key="index"
                            >
                                <code v-if="part.code">{{ part.value }}</code>
                                <template v-else>{{ part.value }}</template>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, unref } from 'vue'

type FrontmatterItem = {
    name: string;
    description: string;
    type?: string;
};

type InlinePart = {
    value: string;
    code: boolean;
};

const { frontmatter } = useData();

const parameters = computed<FrontmatterItem[]>(() => unref(frontmatter).params || []);
const hasType = computed(() => parameters.value.some((parameter) => Boolean(parameter.type)));

function parseInline(value: string): InlinePart[] {
    return value.split(/(`[^`]+`)/g)
        .filter(Boolean)
        .map((part) => ({
            value: part.startsWith('`') && part.endsWith('`') ? part.slice(1, -1) : part,
            code: part.startsWith('`') && part.endsWith('`')
        }));
}
</script>
