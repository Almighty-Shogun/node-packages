<template>
    <section v-if="hasReturns" class="frontmatter-docs__section">
        <h2 id="returns">Returns</h2>

        <p v-if="typeof returns === 'string'" class="frontmatter-docs__description">
            <span
                v-for="(part, index) in parseInline(returns)"
                :key="index"
            >
                <code v-if="part.code">{{ part.value }}</code>
                <template v-else>{{ part.value }}</template>
            </span>
        </p>

        <div v-else class="frontmatter-docs__table-wrap">
            <table class="frontmatter-docs__table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th v-if="hasType">Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in returns" :key="item.name">
                        <td>
                            <code>{{ item.name }}</code>
                        </td>
                        <td v-if="hasType">
                            <code v-if="item.type">{{ item.type }}</code>
                        </td>
                        <td>
                            <span
                                v-for="(part, index) in parseInline(item.description)"
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

const returns = computed<string | FrontmatterItem[]>(() => unref(frontmatter).returns || []);
const hasReturns = computed(() => typeof returns.value === 'string' ? returns.value.length > 0 : returns.value.length > 0);
const hasType = computed(() => Array.isArray(returns.value) && returns.value.some((item) => Boolean(item.type)));

function parseInline(value: string): InlinePart[] {
    return value.split(/(`[^`]+`)/g)
        .filter(Boolean)
        .map((part) => ({
            value: part.startsWith('`') && part.endsWith('`') ? part.slice(1, -1) : part,
            code: part.startsWith('`') && part.endsWith('`')
        }));
}
</script>
