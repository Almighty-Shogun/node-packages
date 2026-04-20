import usePagination from './usePagination'
import { computed, unref, watch, type Ref } from 'vue'

export default function <T>(items: Ref<T[]>, pageSize?: number): UseDataTable<T> {
    const {
        total,
        page,
        perPage,
        limits,
        setPage,
        setPerPage,
        setTotal
    } = usePagination(pageSize);

    const isEmpty = computed(() => unref(filteredItems).length <= 0);

    const filteredItems = computed(() => {
        const _page = unref(page);
        const _perPage = unref(perPage);

        return unref(items).slice((_page - 1) * _perPage, _page * _perPage);
    });

    watch(() => items.value.length, setTotal, { immediate: true });

    return {
        total,
        page,
        perPage,
        limits,
        isEmpty,
        filteredItems,

        setTotal,
        setPage,
        setPerPage
    };
};

type UseDataTable<T> = {
    readonly isEmpty: Ref<boolean>;
    readonly total: Ref<number>;
    readonly page: Ref<number>;
    readonly perPage: Ref<number>;
    readonly limits: Ref<number[]>;
    readonly filteredItems: Ref<T[]>;

    setTotal(total: number): void;
    setPage(page: number): void;
    setPerPage(perPage: number): void;
};
