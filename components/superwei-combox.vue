<template>
	<view class="superwei-combox" :class="border ? '' : 'superwei-combox__no-border'">
		<view v-if="label" class="superwei-combox__label" :style="labelStyle">
			<text>{{label}}</text>
		</view>
		<view class="superwei-combox__input-box">
			<input :focus="input_focus" class="superwei-combox__input" type="text" :placeholder="placeholder"
			 style="text-align: center;"
				placeholder-class="superwei-combox__input-plac" v-model="inputVal" @input="onInput" @focus="onFocus"
				@blur="onBlur" />
			<uni-icons :type="showSelector? 'top' : 'bottom'" size="14" color="#999" @click="toggleSelector">
			</uni-icons>
		</view>
		<view class="superwei-combox__selector" v-if="showSelector">
			<view class="uni-popper__arrow"></view>
			<scroll-view scroll-y="true" class="superwei-combox__selector-scroll" @scroll="roll">
				<view class="superwei-combox__selector-empty" v-if="filterCandidatesLength === 0">
					<text>{{emptyTips}}</text>
				</view>
				<view class="superwei-combox__selector-item" v-for="(item,index) in filterCandidates" :key="index"
					@click="onSelectorClick(index)">
					<text
						:style="(isJSON?item[keyName]?item[keyName]==inputVal:false:item==inputVal)?'font-weight: bold;background-color: '+selectedBackground+';color: '+selectedColor:''">{{isJSON?item[keyName]?item[keyName]:'字段'+keyName+'不存在':item}}</text>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
 
<script>
	export default {
		name: 'superweiCombox',
		emits: ['input', 'update:modelValue','select'],
		props: {
			isJSON: {
				type: Boolean,
				default: false
			},
			keyName: {
				type: String,
				default: ''
			},
			selectedBackground: {
				type: String,
				default: '#f5f7fa'
			},
			selectedColor: {
				type: String,
				default: '#409eff'
			},
			border: {
				type: Boolean,
				default: true
			},
			label: {
				type: String,
				default: ''
			},
			labelWidth: {
				type: String,
				default: 'auto'
			},
			placeholder: {
				type: String,
				default: ''
			},
			candidates: {
				type: Array,
				default () {
					return []
				}
			},
			emptyTips: {
				type: String,
				default: '无匹配项'
			},
			// #ifndef VUE3
			value: {
				type: [String, Number],
				default: ''
			},
			// #endif
			// #ifdef VUE3
			modelValue: {
				type: [String, Number],
				default: ''
			},
			// #endif
			onlySelect:{
				type:Boolean,
				default: false
			},
			filterName:{
				type:String,
				default: 'paramName'
			}
		},
		data() {
			return {
				isInput: false,
				showSelector: false,
				inputVal: '',
				input_focus: false,
				timer: null,
				is_close: true,
				close_timer: null
			}
		},
		computed: {
			labelStyle() {
				if (this.labelWidth === 'auto') {
					return ""
				}
				return `width: ${this.labelWidth}`
			},
			filterCandidates() {
				if (this.isInput) {
					if (this.isJSON) {
						return this.candidates.filter((item) => {
							return item[this.keyName].toString().indexOf(this.inputVal) > -1
						})
					} else {
						return this.candidates.filter((item) => {
							return item.toString().indexOf(this.inputVal) > -1
						})
					}
				} else {
					return this.candidates
				}
			},
			filterCandidatesLength() {
				return this.filterCandidates.length
			}
		},
		watch: {
			// #ifndef VUE3
			value: {
				handler(newVal) {
					this.inputVal = newVal
					this.isInput = true
				},
				immediate: true
			},
			// #endif
			// #ifdef VUE3
			modelValue: {
				handler(newVal) {
					this.inputVal = newVal
					this.isInput = true
				},
				immediate: true
			},
			// #endif
		},
		methods: {
			toggleSelector() {
				this.showSelector = !this.showSelector
				this.isInput = false
			},
			onFocus() {
				this.showSelector = true
				this.isInput = false
				this.input_focus = true
			},
			onBlur() {
				clearTimeout(this.timer)
				if(this.input_focus){
				this.input_focus = false
				}

				setTimeout(() => {
					this.isInput = false
				}, 153)

				this.timer = setTimeout(() => {
					if(this.is_close){
					this.showSelector = false
					if(this.onlySelect){
					let temp = this.filterCandidates.every((item)=>{
						return item[`${this.filterName}`] != this.inputVal
					})
					if(temp){
						this.inputVal = ""
					}
				}
					}
				}, 200);
			},
			onSelectorClick(index) {
				let item = this.filterCandidates[index]
				if(this.isJSON){
					this.inputVal = item[this.keyName]
				}else{
					this.inputVal = item
				}
				this.showSelector = false
				this.$emit('input', this.inputVal)
				this.$emit('update:modelValue', this.inputVal)
				this.$emit('select', item)
			},
			onInput() {
				setTimeout(() => {
					this.$emit('input', this.inputVal)
					this.$emit('update:modelValue', this.inputVal)
				})
			},
			roll() {
				this.is_close = false
				clearTimeout(this.close_timer)
				if(!this.input_focus){
					this.input_focus = true
				}else{
					this.input_focus = false
				}
				clearTimeout(this.timer)
				this.close_timer =	setTimeout(() => {
					this.is_close = true
				}, 250);
			},
		}
	}
</script>
 
<style lang="scss" scoped>
	
	@media only screen and (max-width: 999px) {
	
		/* 针对手机： */
		.superwei-combox {
			font-size: 14px;
			border: 0px solid #12b7f5;
			border-radius: 4px;
			padding: 6px 10px;
			position: relative;
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			// height: 40px;
			flex-direction: row;
			align-items: center;
			// border-bottom: solid 1px #DDDDDD;
			background-color: white;
		}
	
	}
	@media only screen and (min-width: 1000px) {
	
		/* 针对手机： */
		.superwei-combox {
			background-color: white;
			font-size: 14px;
			border: 2px solid #12b7f5;
			border-radius: 4px;
			padding: 6px 10px;
			position: relative;
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			// height: 40px;
			flex-direction: row;
			align-items: center;
			// border-bottom: solid 1px #DDDDDD;
		}
	
	}
	
	
 
	.superwei-combox__label {
		font-size: 16px;
		line-height: 22px;
		padding-right: 10px;
		color: #999999;
	}
 
	.superwei-combox__input-box {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: row;
		align-items: center;
	}
 
	.superwei-combox__input {
		flex: 1;
		font-size: 14px;
		height: 22px;
		line-height: 22px;
    text-align: right;
	}
 
	.superwei-combox__input-plac {
		font-size: 14px;
		color: #999; //placeholder-style="color:#FFFFFF"
	}
 
	.superwei-combox__selector {
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		/* #endif */
		position: absolute;
		top: calc(100% + 12px);
		left: 0;
		width: 100%;
		background-color: #FFFFFF;
		border: 1px solid #EBEEF5;
		border-radius: 6px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		// z-index: 2;
		padding: 4px 0;
    height: 190px;
    z-index: 999;
	}
 
	.superwei-combox__selector-scroll {
		/* #ifndef APP-NVUE */
		max-height: 180px;
		box-sizing: border-box;
		/* #endif */
	}
 
	.superwei-combox__selector-empty,
	.superwei-combox__selector-item {
		/* #ifndef APP-NVUE */
		display: flex;
		cursor: pointer;
		/* #endif */
		line-height: 36px;
		font-size: 14px;
		text-align: center;
		// border-bottom: solid 1px #DDDDDD;
		padding: 0px 0px;
	}
 
	.superwei-combox__selector-empty text,
	.superwei-combox__selector-item text {
		width: 100%;
	}
 
	.superwei-combox__selector-item:hover {
		background-color: #f9f9f9;
	}
 
	.superwei-combox__selector-empty:last-child,
	.superwei-combox__selector-item:last-child {
		/* #ifndef APP-NVUE */
		border-bottom: none;
		/* #endif */
	}
 
	// picker 弹出层通用的指示小三角
	.uni-popper__arrow,
	.uni-popper__arrow::after {
		position: absolute;
		display: block;
		width: 0;
		height: 0;
		border-color: transparent;
		border-style: solid;
		border-width: 6px;
	}
 
	.uni-popper__arrow {
		filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
		top: -6px;
		left: 80%;
		margin-right: 3px;
		border-top-width: 0;
		border-bottom-color: #EBEEF5;
	}
 
	.uni-popper__arrow::after {
		content: " ";
		top: 1px;
		margin-left: -6px;
		border-top-width: 0;
		border-bottom-color: #fff;
	}
 
	.superwei-combox__no-border {
		border: none;
	}
	// .superwei-combox__input-plac{
	// 	text-align: left !important;
	// }
</style>