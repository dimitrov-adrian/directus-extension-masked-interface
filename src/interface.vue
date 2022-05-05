<template>
	<div class="masked-interface" :disabled="disabled" :class="{ [font]: font }">
		<div class="input" :class="{ invalid, disabled, active }">
			<template v-if="iconLeft">
				<span class="prefix">
					<v-icon :name="iconLeft" />
				</span>
			</template>
			<input ref="input" :disabled="disabled" :placeholder="placeholder" @input="onInput" />
			<template v-if="iconRight">
				<span class="suffix">
					<v-icon :name="iconRight" />
				</span>
			</template>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, PropType, watch } from 'vue';
import Inputmask from 'inputmask';

export default defineComponent({
	props: {
		value: {
			type: String,
			default: null,
		},
		required: {
			type: Boolean,
		},
		disabled: {
			type: Boolean,
		},
		active: {
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
			type: String as PropType<'url' | 'email' | 'ip' | 'mac' | 'vin' | 'ssn' | 'mask' | 'regex'>,
			default: 'mask',
		},
		template: {
			type: String,
			default: '',
		},
	},
	emits: ['input'],
	setup(props, { emit }) {
		const input = ref<HTMLInputElement>(null);
		const inputMaskInstance = ref<Inputmask.Instance | null>(null);
		const invalid = ref<boolean>(false);
		const aliasType = ['regex', 'mask'].includes(props.templateType) ? null : props.templateType;

		const customArgs: Inputmask.Options = {};
		if (['regex', 'mask'].includes(props.templateType)) {
			customArgs[props.templateType] = props.template || '';
		}

		onMounted(() => {
			if (!input.value) return;

			inputMaskInstance.value = Inputmask(aliasType, {
				...customArgs,
				showMaskOnHover: true,
				showMaskOnFocus: true,
				jitMasking: false,
				casing: props.transform as Inputmask.Casing,
				importDataAttributes: false,
				autoUnmask: true,
				clearIncomplete: false,
				tabThrough: true,
				nullable: true,
				oncleared: onClear,
				// Build-in event hooks (onincomplete, oncomplete, onclear) are not sufficient do good emit.
			}).mask(input.value);

			inputMaskInstance.value.setValue(props.value || '');
			invalid.value = !isValid();
		});

		watch(
			() => props.value,
			(newValue) => {
				inputMaskInstance.value.setValue(newValue || '');
				invalid.value = !isValid();
			}
		);

		onUnmounted(() => {
			if (!inputMaskInstance.value) return;
			inputMaskInstance.value.remove();
		});

		return {
			input,
			onInput,
			invalid,
		};

		function onClear() {
			invalid.value = false;
			emitValue(null);
		}

		function onComplete() {
			invalid.value = false;
			emitValue(getValue());
		}

		function onIncomplete() {
			invalid.value = true;
			emitValue(props.value);
		}

		function onInput() {
			if (inputMaskInstance.value.isComplete()) {
				onComplete();
			} else {
				onIncomplete();
			}
		}

		function isValid() {
			if (props.required && !getValue()) return false;

			return inputMaskInstance.value.isComplete();
		}

		function emitValue(value: string | null) {
			if (props.disabled) return;
			if (value === props.value) return;

			if (value && inputMaskInstance.value.isValid(value)) {
				emit('input', value);
			} else {
				emit('input', null);
			}
		}

		function getValue() {
			const unmaskedvalue = inputMaskInstance.value.unmaskedvalue();
			if (!unmaskedvalue) return null;

			if (props.storeMasked) return inputMaskInstance.value.format(unmaskedvalue);
			return unmaskedvalue;
		}
	},
});
</script>

<style lang="scss" scoped>
.masked-interface {
	--arrow-color: var(--border-normal);
	--v-icon-color: var(--foreground-subdued);
	--v-input-color: var(--foreground-normal);
	--v-input-background-color: var(--background-input);
	--v-input-border-color-focus: var(--primary);
	height: var(--input-height);

	&.monospace {
		--v-input-font-family: var(--family-monospace);
	}

	&.serif {
		--v-input-font-family: var(--family-serif);
	}

	&.sans-serif {
		--v-input-font-family: var(--family-sans-serif);
	}

	.input {
		position: relative;
		display: flex;
		flex-grow: 1;
		align-items: center;
		height: 100%;
		padding: var(--input-padding);
		padding-top: 0px;
		padding-bottom: 0px;
		color: var(--v-input-color);
		font-family: var(--v-input-font-family);
		background-color: var(--v-input-background-color);
		border: var(--border-width) solid var(--border-normal);
		border-radius: var(--border-radius);
		transition: border-color var(--fast) var(--transition);

		&:hover {
			--arrow-color: var(--border-normal-alt);
			color: var(--v-input-color);
			background-color: var(--background-input);
			border-color: var(--border-normal-alt);
		}
		&:focus-within,
		&.active {
			--arrow-color: var(--border-normal-alt);
			color: var(--v-input-color);
			background-color: var(--background-input);
			border-color: var(--v-input-border-color-focus);
			box-shadow: 0 0 16px -8px var(--primary);
		}
		&.disabled {
			--arrow-color: var(--border-normal);
			color: var(--foreground-subdued);
			background-color: var(--background-subdued);
			border-color: var(--border-normal);
		}
		.prefix,
		.suffix {
			color: var(--foreground-subdued);
		}
		.prefix {
			margin-right: 8px;
		}
	}

	input {
		flex-grow: 1;
		width: 20px; /* allows flex to grow/shrink to allow for slots */
		height: 100%;
		padding: var(--input-padding);
		padding-right: 0px;
		padding-left: 0px;
		font-family: var(--v-input-font-family);
		background-color: transparent;
		border: none;
		appearance: none;
		&::placeholder {
			color: var(--v-input-placeholder-color);
		}
		&:focus {
			border-color: var(--v-input-border-color-focus);
		}
	}

	.input.invalid input {
		color: var(--danger);
	}

	&.small {
		height: 38px;
		.input {
			padding: 8px 12px;
		}
	}

	&.full-width {
		width: 100%;
		.input {
			width: 100%;
		}
	}
}
</style>
