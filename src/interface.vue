<template>
	<v-input
		ref="inputElement"
		:model-value="value"
		:placeholder="placeholder"
		:disabled="disabled"
		:class="{ font: font, isInvalid }"
	>
		<template v-if="iconLeft" #prepend>
			<v-icon :name="iconLeft" />
		</template>
		<template v-if="iconRight" #append>
			<v-icon :name="iconRight" />
		</template>
	</v-input>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, PropType } from 'vue';
import Inputmask from 'inputmask';

export default defineComponent({
	props: {
		value: {
			type: String,
			default: null,
		},
		disabled: {
			type: Boolean,
		},
		placeholder: {
			type: String,
			default: null,
		},
		iconLeft: {
			type: String,
			default: null,
		},
		iconRight: {
			type: String,
			default: null,
		},
		font: {
			type: String as PropType<'sans-serif' | 'serif' | 'monospace'>,
			default: 'sans-serif',
		},
		storeMasked: {
			type: Boolean,
			default: false,
		},
		transform: {
			type: String as PropType<'' | 'lower' | 'upper' | 'title'>,
			default: '',
		},
		templateType: {
			type: String,
			default: 'mask',
		},
		template: {
			type: String,
			default: '',
		},
	},
	emits: ['input'],
	setup(props, { emit }) {
		const inputElement = ref<{ input: HTMLInputElement } | null>(null);
		const inputMaskInstance = ref<Inputmask.Instance | null>(null);
		const isInvalid = ref<boolean>(false);

		onMounted(() => {
			const aliasType = ['regex', 'mask'].includes(props.templateType) ? null : props.templateType;
			const customArgs = {};
			if (['regex', 'mask'].includes(props.templateType)) {
				customArgs[props.templateType] = props.template || '';
			}

			inputMaskInstance.value = Inputmask(aliasType, {
				...customArgs,
				greedy: true,
				showMaskOnHover: true,
				showMaskOnFocus: true,
				jitMasking: false,
				casing: props.transform as Inputmask.Casing,
				importDataAttributes: false,
				autoUnmask: !props.storeMasked,
				clearIncomplete: false,
				tabThrough: true,
				nullable: true,
				autoUnmask: true,

				oncleared: () => {
					emit('input', null);
					isInvalid.value = false;
				},

				onincomplete: () => {
					isInvalid.value = true;
				},

				oncomplete: () => {
					emit('input', inputMaskInstance.value.unmaskedvalue());
					isInvalid.value = false;
				},
			}).mask(inputElement.value.input);

			isInvalid.value = !inputMaskInstance.value.isValid();
		});

		watch(
			() => props.value,
			(newValue, oldValue) => {
				if (newValue === oldValue) return;
				if (!inputMaskInstance.value) return;

				inputMaskInstance.value.setValue(newValue || '');
			}
		);

		return {
			inputElement,
			isInvalid,
		};
	},
});
</script>

<style lang="css" scoped>
.monospace {
	--v-input-font-family: var(--family-monospace);
}

.serif {
	--v-input-font-family: var(--family-serif);
}

.sans-serif {
	--v-input-font-family: var(--family-sans-serif);
}

.isInvalid:deep(.input) {
	color: var(--danger);
	background-color: var(--danger-10);
}
</style>
