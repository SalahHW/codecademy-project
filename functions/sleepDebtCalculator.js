const getSleepHours = day => {
  switch (day) {
    case 'monday' : return 8;
    break;
    case 'tuesday' : return 6;
    break;
    case 'wednesday' : return 7;
    break;
    case 'thursday' : return 9;
    break;
    case 'friday' : return 9;
    break;
    case 'saturday' : return 9;
    break;
    case 'sunday' : return 9;
    break;
  }
}

const getActualSleepHours = () => {
  return getSleepHours('monday') + getSleepHours('tuesday') + getSleepHours('wednesday') + getSleepHours('thursday') + getSleepHours('friday') + getSleepHours('saturday') + getSleepHours('sunday');
}

const getIdealSleepHours = () => {
  const idealHours = 8;
  return idealHours * 7;
}

function calculateSleepDebt() {
  let actualSleepHours = getActualSleepHours();
  let idealSleepHours = getIdealSleepHours();
  const hoursOfSleepAbove = actualSleepHours - idealSleepHours;
  const hoursOfSleepBelow = idealSleepHours - actualSleepHours;

  if (actualSleepHours === idealSleepHours){
    console.log('You got the perfect amount of sleep')
  } else if (actualSleepHours > idealSleepHours) {
    console.log('You got more sleep than needed.' + hoursOfSleepAbove + ' hours above.')
  } else {
    console.log('You should get some rest, you have '+ hoursOfSleepBelow + ' hours of sleep in debt.')
  }
}

calculateSleepDebt();
