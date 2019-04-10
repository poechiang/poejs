define([
	'../core/extend'
], function(extend) {
	"use strict"
	Date.from = function(ts, ms) {
		var d = new Date
		if (!ms) {
			ts *= 1000
		}
		d.setTime(ts)
		return d
	}
	var parse = Date.parse
	Date.parse = function(str) {
		return Date.from(parse(str))
	}
	extend(Date.prototype, {
		time: function(sec, ms) {
			if (sec === undefined || sec === false) {
				sec = this.getTime
				if (!ms) {
					sec /= 1000
				}
				return Math.floor(sec)
			} else {

				if (!ms) {
					sec *= 1000
				}
				this.setTime(sec)
			}
		},
		format: function(fmt) {
			var year = this.getFullYear(),
				month = this.getMonth(),
				day = this.getDate(),
				week = this.getDay(),
				hour = this.getHours(),
				minute = this.getMinutes(),
				second = this.getSeconds(),
				millsec = this.getMilliseconds(),
				d = day < 10 ? '0' + day : day, //d - 一个月中的第几天（从 01 到 31）
				D = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][week], //D - 星期几的文本表示（用三个字母表示）
				j = day, // j - 一个月中的第几天，不带前导零（1 到 31）
				l = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][week], //l（'L' 的小写形式）- 星期几的完整的文本表示
				//N = week+1,//N - 星期几的 ISO-8601 数字格式表示（1表示Monday[星期一]，7表示Sunday[星期日]）
				w = week, //w - 星期几的数字表示（0 表示 Sunday[星期日]，6 表示 Saturday[星期六]）

				//W - 用 ISO-8601 数字格式表示一年中的星期数字（每周从 Monday[星期一]开始）
				F = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month], //F - 月份的完整的文本表示（January[一月份] 到 December[十二月份]）
				m = month >= 9 ? (month + 1) : '0' + (month + 1), //m - 月份的数字表示（从 01 到 12）
				M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month], //M - 月份的短文本表示（用三个字母表示）
				n = month + 1, //n - 月份的数字表示，不带前导零（1 到 12）

				Y = year, //Y - 年份的四位数表示
				y = year.toString().substr(2), //y - 年份的两位数表示
				a = hour >= 12 ? 'pm' : 'am', //a - 小写形式表示：am 或 pm
				A = hour >= 12 ? 'PM' : 'AM', //A - 大写形式表示：AM 或 PM
				g = hour % 12, //g - 12 小时制，不带前导零（1 到 12）
				G = hour, //G - 24 小时制，不带前导零（0 到 23）
				h = g < 10 ? '0' + g : g, //h - 12 小时制，带前导零（01 到 12）
				H = G < 10 ? '0' + G : G, //H - 24 小时制，带前导零（00 到 23）
				i = minute < 10 ? '0' + minute : minute, //i - 分，带前导零（00 到 59）
				s = second < 10 ? '0' + second : second, //s - 秒，带前导零（00 到 59）


				f = (new Array(3 - millsec.toString().length)).fill(0) + millsec,

				S = (day + 1) //S - 一个月中的第几天的英语序数后缀（2 个字符：st、nd、rd 或 th。与 j 搭配使用）

			switch (day) {
				case 0:
					S += 'st'
					break
				case 1:
					S += 'nd'
					break
				default:
					S += 'th'
			}

			if (fmt) {
				return fmt.replace('d', d).replace('D', D).replace('j', j).replace('l', l).replace('w', w).replace('F', F).replace('m', m).replace('M', M).replace('n', n).replace('Y', Y).replace('y', y).replace('a', a).replace('A', A).replace('g', g).replace('G', G).replace('h', h).replace('H', H).replace('i', i).replace('s', s).replace('S', S).replace('f', f)
			} else {
				return this.toString()
			}
		}
	})
})