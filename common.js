function _translate (){
	if ($('.answer')) $('.answer').remove();	/*Если существует div с классом answer то он удаляется*/

	var expression = $('input[type="text"]').val();	/*Берется выражения из input*/
	expression = expression.toLowerCase().replace(/\s/g, '');	/*Приимает нижниый регистр и удаляются пробелы*/
	var prec = {	/*Объект (типо словарь) приоритетов операторов*/
		'(': 1,
		'+': 2,
		'-': 2,
		'*': 3,
		'/': 3	}
	var opSctack = [];	/*Массив (типо стек) куда записаваются операторы*/
	var postfixList = [];	/*Массив куда записываются элементы преобразованного выражения*/ 
	var tokenList = expression.split('');	/*Массив элементов выражения*/

	var form = $('input[name="r1"]');	
	if (form[0].checked){	/*Если выбрано постфиксное преобразование*/

		for (var token = 0; token < tokenList.length; token++){	/*Перебор каждого элемента выражения слева на право*/

			if (tokenList[token] != '-' && tokenList[token] != '+' && tokenList[token] != '*' && tokenList[token] != '/' && tokenList[token] != '(' && tokenList[token] != ')'){			/*Если в массиве, элемент[token] != операторам*/
				postfixList.push(tokenList[token]);	/*Записывается в конец массива как преобразованная часть*/

			}else if (tokenList[token] == '(') {	
				opSctack.push(tokenList[token]);	/*Записывается в конец массива */

			}else if (tokenList[token] == ')'){	
				var topToken = opSctack.pop();	/*Переменная принемает последний элемент массива(этот элм удалятся*/
				while (topToken != '('){	
					postfixList.push(topToken);	/*Элемент из переменной записывается в конец массива*/
					topToken = opSctack.pop();
				}

			}else{
				while (opSctack.length > 0 && prec[opSctack[opSctack.length - 1]] >= prec[tokenList[token]]){	/*Если массив с операторами не пуст и приоритет последнего элм в массиве >= элементу[token]*/
					postfixList.push(opSctack.pop());	/*В конец массива записывается оператор(сам он удаляется)*/
				}
				opSctack.push(tokenList[token]);	/*В конец массива записывается элемент[token]*/
			}
		}

		while (opSctack.length > 0){	/*Если ещё есть операторы в массиве*/
			postfixList.push(opSctack.pop());	/*То они с конца удаляются и записывабтся в конец преобразованного выражения*/
		}
		
		$('body .container').append('<p class="answer text-primary ">Answer: ' + postfixList.join('') + '</p>');	/*в div выводиться соединенные элементы массива с перобразованными элементами*/

	}else{	/*Если выбрано префиксное преобразование*/

		for (var token = tokenList.length ; token >= 0; token--){	/*Перебор каждого элемента выражения справа на лево*/
			if (tokenList[token] != '-' && tokenList[token] != '+' && tokenList[token] != '*' && tokenList[token] != '/' && tokenList[token] != '(' && tokenList[token] != ')'){
				postfixList.unshift(tokenList[token]);	/*Записывается в начало массива как преобразованная часть*/

			}else if (tokenList[token] == ')') {
				opSctack.unshift(tokenList[token]);	/*Записывается в начало массива */

			}else if (tokenList[token] == '('){
				var topToken = opSctack.shift();	/*Переменная принемает первый элемент массива(сам он  удалятся*/
				while (topToken != ')'){
					postfixList.unshift(topToken);	/*Элемент из переменной записывается в начало массива*/
					topToken = opSctack.shift();					
				}

			}else{
				while (opSctack.length > 0 && prec[opSctack[0]] > prec[tokenList[token]]){	/*Если массив с операторами не пуст и приоритет первого элм в массиве > элемента[token]*/
					postfixList.unshift(opSctack.shift());	/*В начале массива записывается оператор(сам он удаляется)*/
				}
				opSctack.unshift(tokenList[token]);	/*В начале массива записывается элемент[token]*/
			}

		}

		while (opSctack.length > 0){	/*Если ещё есть операторы в массиве*/
			postfixList.unshift(opSctack.shift());	/*То они начиная с начала массива записывабтся в конец преобразованного выражения и удаляются*/

		}
		$('body .container').append('<p class="answer text-primary ">Answer: ' + postfixList.join('') + '</p>');	/*в div выводиться соединенные элементы массива с перобразованными элементами*/
	}
}

function _translateInf(){
	if ($('.answer')) $('.answer').remove();	/*Если существует div с классом answer то он удаляется*/

	var expression = $('input[name="toInf"]').val();	/*Берется выражения из input*/
	expression = expression.toLowerCase().replace(/\s/g, '');	/*Приимает нижниый регистр и удаляются пробелы*/

	var opSctack = [];	/*Массив (типо стек) куда записаваются операторы*/
	var tokenList = expression.split('');	/*Массив элементов выражения*/

	var form = $('input[name="r2"]');	
	if (form[0].checked){	/*Если выбрано из постфиксной*/

		for (var token = 0; token < tokenList.length; token++){	/*Перебор каждого элемента выражения слева на право*/

			if (tokenList[token] != '-' && tokenList[token] != '+' && tokenList[token] != '*' && tokenList[token] != '/' && tokenList[token] != '(' && tokenList[token] != ')'){			/*Если в массиве, элемент[token] != операторам*/
				opSctack.push(tokenList[token]);	/*Записывается в конец массива как опернанд*/

			}else{
				if (opSctack.length > 0){	/*Если массив с опернандами не пуст */
					var i1 = opSctack.pop();	/*Первый опернанд с конца удлаяется и записывается в i1*/
					var i2 = opSctack.pop();	/*Второй опернанд с конца удлаяется и записывается в i2*/
					var c = i2 + tokenList[token] + i1;	/*Записываются со знаком tokenList[token]*/
					// if (token != (tokenList.length - 1)){
						c = '(' + c + ')';
					// }
					opSctack.push(c);	/*Выражение записывается как элемент в конец*/
				}
			}
		}
		
		$('body .container').append('<p class="answer text-primary ">Answer: ' + opSctack.join('') + '</p>');	/*в div выводиться соединенные элементы массива с перобразованными элементами*/
	
	}else{

		for (var token = tokenList.length; token >= 0; token--){	/*Перебор каждого элемента выражения справа на лево*/
			if (tokenList[token] != '-' && tokenList[token] != '+' && tokenList[token] != '*' && tokenList[token] != '/' && tokenList[token] != '(' && tokenList[token] != ')'){			/*Если в массиве, элемент[token] != операторам*/
				opSctack.push(tokenList[token]);

			}else{
				if (opSctack.length > 0){	/*Если массив с опернандами не пуст */
					var i1 = opSctack.pop();	/*Первый опернанд с конца удлаяется и записывается в i1*/
					var i2 = opSctack.pop();	/*Второй опернанд с конца удлаяется и записывается в i2*/
					var c = i1 + tokenList[token] + i2;		/*Записываются со знаком tokenList[token]*/
					// if ((tokenList.length - token) != tokenList.length){
						c = '(' + c + ')';
					// }
					opSctack.push(c);	/*Выражение записывается как элемент в конец*/
				}
			}
		}

		$('body .container').append('<p class="answer text-primary ">Answer: ' + opSctack.join('') + '</p>');	/*в div выводиться соединенные элементы массива с перобразованными элементами*/

	}
}
