import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
  
// function component
const AnimatedCard = ({ animation, digit }) => {
  return(
    <div className={`flipCard ${animation}`}>
      <span>{digit}</span>
    </div>
  );
};

// function component
const StaticCard = ({ position, digit }) => {
  return(
    <div className={position}>
      <span>{digit}</span>
    </div>
  );
};

// function component
const FlipUnitContainer = ({ digit, previousDigit, shuffle }) => {	
  
  //todo: add variable if it must go up or down

  // assign digit values
  let currentDigit = digit;

  // shuffle digits
  const digit1 = shuffle 
    ? previousDigit 
    : currentDigit;
  const digit2 = !shuffle 
    ? previousDigit 
    : currentDigit;
    
  // shuffle animations
  const animation1 = shuffle ? 'fold'  : 'unfold';
  const animation2 = !shuffle ? 'fold' : 'unfold';

  return(
    <div className={'flipUnitContainer'}>
      <StaticCard 
        position={'upperCard'} 
        digit={currentDigit} 
        />
      <StaticCard 
        position={'lowerCard'} 
        digit={previousDigit} 
        />
      <AnimatedCard 
        digit={digit1}
        animation={animation1}
        />
      <AnimatedCard 
        digit={digit2}
        animation={animation2}
        />
    </div>
  );
};

// const FlipUnitContainerGenerator = ({ new_digits, old_digits }) => {

//   //todo:add zero if smaller then 100k
//   if(new_digits.length <= 5)
//     new_digits.unshift(0); old_digits.unshift(0);

//     let flipUnits = [] 
//   new_digits.map((number, i) =>
//     {
//       const shuffle = number !== old_digits[i];
//       flipUnits.push(<FlipUnitContainer key={i} digit={number} previousDigit={old_digits[i]} shuffle={ shuffle }  />);
//     }
//   );

//   return (
//     flipUnits
//   );

// };

// class component
class FlipClounter extends React.Component {
	
  constructor(props) {
		super(props);
		this.state = {
      old_follower_count: 0,
      digit1: 0,
      oldDigit1: 0,
      shuffle1: 0,
      digit2: 0,
      oldDigit2: 0,
      shuffle2: 0,
      digit3: 0,
      oldDigit3: 0,
      shuffle3: 0,
      digit4: 0,
      oldDigit4: 0,
      shuffle4: 0,
      digit5: 0,
      oldDigit5: 0,
      shuffle5: 0,
      digit6: 0,
      oldDigit6: 0,
      shuffle6: 0
    };
    this.updateFollowerCount();
	}
  
	componentDidMount() {
		this.timerID = setInterval(
			() => this.updateFollowerCount(),
			30000
		);
	}
  
	componentWillUnmount() {
		clearInterval(this.timerID);
	}
  
	updateFollowerCount() {
    let new_follower_count = 0;
    let new_digits_arr = [];
    let old_digits_arr = []
		// get new followercount
    fetch('https://www.instagram.com/web/search/topsearch/?query=eigenhuisentuin').then((result) => {
            return result.json();
        }).then((jsonResult) => {

            const block = jsonResult.users[0].user;
            new_follower_count = block.follower_count;
            console.log(this.state.old_follower_count);
            // sperate digits
            new_digits_arr = (""+new_follower_count).split("");
            old_digits_arr = (""+this.state.old_follower_count).split("");

            while(new_digits_arr.length !== 6)
              new_digits_arr.unshift(0);
              
            while(old_digits_arr.length !== 6)
              old_digits_arr.unshift(0);
              
              if(new_digits_arr[0] !== old_digits_arr[0])
              {
                this.setState({
                    digit1: new_digits_arr[0],
                    oldDigit1: old_digits_arr[0],
                    shuffle1: true
                });
              }

              if(new_digits_arr[1] !== old_digits_arr[1])
              {
                this.setState({
                    digit2: new_digits_arr[1],
                    oldDigit2: old_digits_arr[1],
                    shuffle2: true
                });
              }

              if(new_digits_arr[2] !== old_digits_arr[2])
              {
                this.setState({
                    digit3: new_digits_arr[2],
                    oldDigit3: old_digits_arr[2],
                    shuffle3: true
                });
              }

              if(new_digits_arr[3] !== old_digits_arr[3])
              {
                this.setState({
                    digit4: new_digits_arr[3],
                    oldDigit4: old_digits_arr[3],
                    shuffle4: true
                });
              }

              if(new_digits_arr[4] !== old_digits_arr[4])
              {
                this.setState({
                    digit5: new_digits_arr[4],
                    oldDigit5: old_digits_arr[4],
                    shuffle5: true
                });
              }

              if(new_digits_arr[5] !== old_digits_arr[5])
              {
                this.setState({
                    digit6: new_digits_arr[5],
                    oldDigit6: old_digits_arr[5],
                    shuffle6: true
                });
              }

            if(new_follower_count !== this.state.old_follower_count){
                this.setState({
                    old_follower_count: new_follower_count,
                });
              }
        })
    
    

		
	}
  
	render() {
    
    // state object destructuring
		const { 
      digit1,
      oldDigit1,
      shuffle1,
      digit2,
      oldDigit2,
      shuffle2,
      digit3,
      oldDigit3,
      shuffle3,
      digit4,
      oldDigit4,
      shuffle4,
      digit5,
      oldDigit5,
      shuffle5,
      digit6,
      oldDigit6,
      shuffle6
    } = this.state;

    
    return(
        <div className={'flipClock'}>
          <FlipUnitContainer digit={digit1} previousDigit={oldDigit1} shuffle={shuffle1}  />
          <FlipUnitContainer digit={digit2} previousDigit={oldDigit2} shuffle={shuffle2}  />
          <FlipUnitContainer digit={digit3} previousDigit={oldDigit3} shuffle={shuffle3}  />
          <FlipUnitContainer digit={digit4} previousDigit={oldDigit4} shuffle={shuffle4}  />
          <FlipUnitContainer digit={digit5} previousDigit={oldDigit5} shuffle={shuffle5}  />
          <FlipUnitContainer digit={digit6} previousDigit={oldDigit6} shuffle={shuffle6}  />
        </div>
		);
	}
}

// function component
const Header = () => {
  return(
    <header>
      <h1>@eigenhuisenthuis instagram</h1>
    </header>
  );
};

// function component
const App = () => {
  return (
    <div>
      <Header />       
      <FlipClounter />
    </div>
  );
};


  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();