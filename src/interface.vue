<template>
	<v-input
		:placeholder="placeholder"
		:disabled="disabled"
		:class="{ [font]: true }"
		ref="element"
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
import Inputmask from "inputmask/bundle";

export default {
	props: {
		value: {
			type: String,
			default: null
		},
		disabled: {
			type: Boolean
		},
		placeholder: {
			type: String,
			default: null
		},
		iconLeft: {
			type: String,
			default: null
		},
		iconRight: {
			type: String,
			default: null
		},
		font: {
			type: String,
			default: "sans-serif"
		},
		storeMasked: {
			type: Boolean
		},
		transform: {
			type: String,
			default: ""
		},
		templateType: {
			type: String,
			default: "mask"
		},
		template: {
			type: String,
			default: ""
		}
	},

	watch: {
		value: function(newValue, oldValue) {
			if (newValue !== oldValue) {
				this.$emit("input", newValue);
				this.$refs.element.input.inputmask.setValue(newValue ? newValue : "");
			}
		}
	},

	mounted: function() {
		const type = this.templateType === "regex" ? "regex" : "mask";

		Inputmask({
			[type]: this.template || "",
			greedy: true,
			showMaskOnHover: true,
			showMaskOnFocus: true,
			jitMasking: false,
			casing: this.transform,
			importDataAttributes: false,
			autoUnmask: !this.storeMasked,

			oncleared: event => {
				this.$emit("input", null);
				event.target.classList.remove("invalid");
			},

			onincomplete: event => {
				event.target.classList.add("invalid");
			},

			oncomplete: event => {
				this.$emit("input", event.target.value);
				event.target.classList.remove("invalid");
			}
		}).mask(this.$refs.element.input);
	}
};
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

>>> .invalid {
	color: var(--danger);
	background-color: var(--danger-10);
}
</style>
