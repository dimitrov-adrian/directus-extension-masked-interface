<template>
	<v-input
		ref="inputElement"
		:model-value="value"
		:placeholder="placeholder"
		:disabled="disabled"
		:class="{ [font]: font }"
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
import { defineComponent, ref, onMounted, onUnmounted, watch, PropType } from 'vue';
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

		onMounted(() => {
			const aliasType = ['regex', 'mask'].includes(props.templateType) ? null : props.templateType;

			const customArgs: Inputmask.Options = {};

			if (['regex', 'mask'].includes(props.templateType)) {
				customArgs[props.templateType] = props.template || '';
				customArgs.greedy = true;
			}

			inputMaskInstance.value = Inputmask(aliasType, {
				...customArgs,
				showMaskOnHover: true,
				showMaskOnFocus: true,
				jitMasking: false,
				casing: props.transform as Inputmask.Casing,
				importDataAttributes: false,
				autoUnmask: !props.storeMasked,
				clearIncomplete: false,
				tabThrough: true,
				nullable: true,

				onincomplete: () => {
					inputElement.value.input.classList.add('invalid');
				},

				onKeyValidation: () => {
					inputElement.value.input.classList.toggle('invalid', !inputMaskInstance.value.isValid());
				},

				oncomplete: () => {
					inputElement.value.input.classList.remove('invalid');
					emit('input', inputMaskInstance.value.unmaskedvalue());
				},
			}).mask(inputElement.value.input);

			inputMaskInstance.value.setValue(props.value || '');
		});

		onUnmounted(() => {
			if (!inputMaskInstance.value) return;
			inputMaskInstance.value.remove();
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

:deep(input.invalid) {
	color: var(--danger);
}
</style>
