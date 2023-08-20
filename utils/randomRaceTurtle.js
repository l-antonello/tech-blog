const raceTheTurtle = (req, res, next) => {
  const ran = Math.floor(Math.random() * 20);

  if(ran < 10){
    req.turtle = { ran: ran, win: true };
    next();
  }
  else {
    req.turtle = { ran: ran, win: false };
    next();
  }
};

module.exports = raceTheTurtle;
