import type { ComponentOptionsMixin } from 'vue/types/v3-component-options';
import type { Ref, Data, ExtractPropTypes } from 'vue';
import type { DefineComponent } from 'vue/types/v3-define-component';
declare const _sfc_main: DefineComponent<{
    logText: {
        type: StringConstructor;
        required: true;
    };
}, {
    __sfc: boolean;
    props: {
        logText: string;
    };
    logText: Ref<string>;
    handleClick: (e: MouseEvent) => void;
}, Data, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, Readonly<ExtractPropTypes<{
    logText: {
        type: StringConstructor;
        required: true;
    };
}>>, {}>;
export default _sfc_main;
