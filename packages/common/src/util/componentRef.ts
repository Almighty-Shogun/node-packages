import { ref, type Ref } from 'vue';
import type { Nullable } from '@almighty-shogun/utils';

type ComponentImport = abstract new (...args: any[]) => any;

export default function <TComponent extends ComponentImport>(component: TComponent): Ref<Nullable<InstanceType<TComponent>>> {
    return ref(null) as Ref<Nullable<InstanceType<TComponent>>>;
}
