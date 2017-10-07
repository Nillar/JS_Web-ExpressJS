function generatePID() {
    let egn = [];
    let currentAge = '';
    let lastDigits = 0;
    let monthsCounter = 0;
    //ages
    for (let i = 17; i <= 92; i++) {
        currentAge = '';
        currentAge += i;
        // months
        for (let j = 1; j <= 12; j++) {

            if(monthsCounter === 0){
                if (j < 10) {
                    currentAge += "0" + j;

                } else {
                    currentAge += j;
                }
                monthsCounter++;
            }
            else {

            }


            //date
            for (let k = 1; k < 31; k++) {
                if (k < 10) {
                    currentAge += "0" + k;

                } else {
                    currentAge += k;

                }

                // second to last digits
                for (let l = 0; l <= 99; l++) {
                    if (l < 10) {
                        currentAge += "0" + l;

                    } else {
                        currentAge += l;

                    }
                    //last two digits
                    for (let m = 0; m <= 99 + 1; m++) {
                        if (m < 10) {
                            currentAge += "0" + m;
                            egn.push(currentAge);
                            currentAge = currentAge.slice(0, 8);
                        } else {
                            currentAge += m;
                            egn.push(currentAge);
                            currentAge = currentAge.slice(0, 8);
                        }
                        // lastDigits++;

                    }
                }
            }

        }
        lastDigits++;
        egn.push(currentAge);
        console.log(egn);
        break;


    }

}

generatePID();