import Vue from 'vue'
import { formatCurrency } from '@/utility/helpers'

Vue.filter('currency', val => formatCurrency(val))
