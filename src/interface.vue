<template>
	<v-input
		:placeholder="placeholder"
		:disabled="disabled"
		:model-value="value"
		:class="{ [font]: true }"
		ref="inputElement"
	>
		<template v-if="iconLeft" #prepend>
			<v-icon :name="iconLeft" />
		</template>
		<template v-if="iconRight" #append>
			<v-icon :name="iconRight" />
		</template>
	</v-input>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from 'vue';
import Inputmask from 'inputmask/bundle';

export default defineComponent({
	emits: ['input'],
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
			type: String,
			default: 'sans-serif',
		},
		storeMasked: {
			type: Boolean,
			default: false,
		},
		transform: {
			type: String,
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
	setup(props, { emit }) {
		const inputElement = ref(null);

		onMounted(() => {
			const type = props.templateType === 'regex' ? 'regex' : 'mask';

			Inputmask({
				[type]: props.template || '',
				greedy: true,
				showMaskOnHover: true,
				showMaskOnFocus: true,
				jitMasking: false,
				casing: props.transform,
				importDataAttributes: false,
				autoUnmask: !props.storeMasked,
				clearIncomplete: false,

				oncleared: (event) => {
					emit('input', null);
					event.target.classList.remove('invalid');
				},

				onincomplete: (event) => {
					event.target.classList.add('invalid');
				},

				oncomplete: (event) => {
					emit('input', event.target.value);
					event.target.classList.remove('invalid');
				},
			}).mask(inputElement.value.input);
		});

		watch(
			() => props.value,
			(newValue, oldValue) => {
				if (newValue === oldValue) return;
				inputElement.value.input.inputmask.setValue(newValue || '');
			}
		);

		return {
			inputElement,
			font: props.font,
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

::v-deep(.invalid) {
	color: var(--danger);
	background-color: var(--danger-10);
}
</style>
