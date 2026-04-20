import { ref, type Ref } from 'vue'

export default function (pageSize: number = 5): UsePagination {
    const total = ref<number>(0);

    const page = ref<number>(1);
    const perPage = ref<number>(pageSize);

    const limits = ref<number[]>([5, 10, 25, 50, 100]);

    function setTotal(value: number): void {
        total.value = value;
    }

    function setPage(value: number): void {
        page.value = value;
    }

    function setPerPage(value: number): void {
        perPage.value = value;
    }

    return {
        total,
        page,
        perPage,
        limits,

        setTotal,
        setPage,
        setPerPage
    };
};

type UsePagination = {
    readonly limits: Ref<number[]>;
    readonly page: Ref<number>;
    readonly perPage: Ref<number>;
    readonly total: Ref<number>;

    setTotal(total: number): void;
    setPage(page: number): void;
    setPerPage(perPage: number): void;
};
