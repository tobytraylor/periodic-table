import React, {useState, ReactFragment} from 'react';
import './App.css';
import elements from './elements.json';
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

// TODO: Drag and drop shows a pointer, allows dirty cheaters, dirty dirty cheaters, hate them

// let cookiesPerDayForToday = [1,5,2,4,6,5,4,3,2,1]
// let familyMember = ['sheryl', 'toby', 'brody', 'cj']
// let familyMembersToCookies = {'sheryl': 3, 'toby': 2, 'brody': 5001, 'cj': 6}
// let familyMembersToDailyHistory = {'sheryl': [5,1,2,3,1], 'toby': [52,5,2,1], 'brody': [6,1,2,3,1,1], 'cj': 6}


// class Person {
//   constructor(name, height, weight) {
//     this.name = name;
//     this.height = height;
//     this.weight = weight;
//   }

// }

// let familyToLotsO = {'sheryl': Person('Sheryl Traylor', 110, 12*5+4), 'brody': Person(2,7)}

// function square(x) {
//   return x * x;
// }
// let answer = square(5)

// function muliplyNumbers(q, y) {
//   return x * y;
// }

// let result = multiplyNumbers(15, 45);

const Slot = (props) => {
  const { number, state, setState } = props; 
  if (!state) {
    throw `blah ${number}`
  }

  const [{ isOver }, drop] = useDrop({
    accept: "TILE",
    //drop: () => moveKnight(x, y),
    canDrop: (item, monitor) => {
      console.log(JSON.stringify(item))
      return (item.number == number)
    },
    drop: (item, monitor) => {
      let newState = [...state]
      newState[number-1] = true
      setState(newState)
    },
    collect: (mon) => ({
      isOver: !!mon.isOver()
    }),
  })

  const isFilled = state[number-1]
  const elementData = elements[number-1]
  let tileKids;
  if(isFilled) {
    return (
      <div
          style={{width: '4vw', 
                  height: '4vw', 
                  border: '2px solid black', 
                  margin: "1px", 
                  display: 'inline-block',
                  background: '#9fa1d4',
                  overflow: 'hidden',
                  textAlign: "center"}}>
        {/* <div style={{fontSize: ".5vw"}}>{number}</div> */}
        <div style={{fontSize: '2vw'}}>{elementData.symbol}</div>
        <div style={{fontSize: '.7vw'}}>{elementData.name}</div>
      </div>
    )
  } else {
    return (
      <div ref={drop}  
          style={{width: '4vw', 
                  height: '4vw', 
                  border: '2px solid black', 
                  margin: "1px", 
                  color: '#eee',
                  display: 'inline-block',
                  boxShadow: 'inset 0px 0px 9px #606180',
                  background: (isOver) ? '#ddd' : '#888',
                  overflow: 'hidden',
                  textAlign: 'center',
                  }}>
          <div>
            <div style={{fontSize: ".9vw"}}>{number}</div>
            {/* <div style={{fontSize: "2vw"}}>{elementData.symbol}</div> */}
          </div>
      </div>
    )
  }
 
}

const SlotRow = (props) => {
  const { from, to, state, setState } = props;
  let boxes = [];
  for (let i=from; i <= to; i++) {
    boxes.push(<Slot key={i} number={i} state={state} setState={setState}/>)
  }
  return boxes;
}

const Spacer = () => (
  <div style={{width: '4vw', 
        height: '4vw',
        border: '2px solid white', 
        margin: "1px", 
        display: 'inline-block',
        // boxShadow: 'inset 0px 0px 9px #005060',
        background: "#fff",
        overflow: 'hidden',
    }}>
  </div>
)

const SpacerRow = (props) => {
  let boxes = [];
  for (let i=0; i < props.count; i++) {
    boxes.push(<Spacer key={i} />)
  }
  return boxes;
}


// TODO: (Toby Traylor) wrap problem

const ElementTile = (props) => {
  const { number, symbol, name, atomicMass } = props; 
  const [ {isDragging}, drag] = useDrag({
    item: { type: 'TILE', number: number },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
  })
  return (
    <div ref={drag} 
        style={{width: '4vw', 
        height: '4vw', 
        border: '2px solid black', 
        margin: "1px", 
        display: 'inline-block',
        background: '#9fa1d4',
        textAlign: "center",
        opacity: isDragging ? 0.5 : 1}}>

      <div style={{fontSize: '2vw'}}>{symbol}</div>
      <div style={{fontSize: '.7vw'}}>{name}</div>
    </div>
  )
}

const PeriodicTableSlots = ({state, setState}) => {
  return (
    // style={{backgroundImage: 'linear-gradient(217deg, #DDA0DD, #50EFFF)', height: '100vh'}
    <div style={{textAlign: 'center'}}>
      <div>
        <Slot number={1} state={state} setState={setState}/>
        <SpacerRow count={16} state={state} setState={setState}/>
        <Slot number={2} state={state} setState={setState}/>
      </div>
      <div>
        <SlotRow from={3} to={4} state={state} setState={setState}/>
        <SpacerRow count={10} state={state} setState={setState}/>
        <SlotRow from={5} to={10} state={state} setState={setState}/>
      </div>
      <div>
        <SlotRow from={11} to={12} state={state} setState={setState}/>
        <SpacerRow count={10} state={state} setState={setState}/>
        <SlotRow from={13} to={18} state={state} setState={setState}/>
      </div>
      <div>
        <SlotRow from={19} to={36} state={state} setState={setState}/>
      </div>
      <div>
        <SlotRow from={37} to={54} state={state} setState={setState}/>
      </div>
      <div>
        <SlotRow from={55} to={56} state={state} setState={setState}/>
        <Spacer />
        <SlotRow from={72} to={86} state={state} setState={setState}/>
      </div>
      <div>
        <SlotRow from={87} to={88} state={state} setState={setState}/>
        <Spacer />
        <SlotRow from={104} to={118} state={state} setState={setState}/>
      </div>
      <div>
        <Spacer />
      </div>
      <div>
      <Spacer />
        <Spacer />
        <Spacer />
        <SlotRow from={57} to={71} state={state} setState={setState}/>
      </div>
     
      <div>
        <Spacer />
        <Spacer />
        <Spacer />
        <SlotRow from={89} to={103} state={state} setState={setState}/>
      </div>
    </div>
  );
}



const App = () => {
  const [table, setTable] = useState(elements.map((x) => {return false}))
  let options = []
  for (var i=0; i< table.length; i++) {
    if (!table[i]) {
      options.push(elements[i])
    }
  }
  options.sort((a,b) => (a.name > b.name) ? 1 : -1)
  
  return (
    <DndProvider backend={Backend}>
      <React.Fragment>
        <PeriodicTableSlots state={table} setState={setTable}></PeriodicTableSlots>

        {options.map((element) => 
          <ElementTile  key={element.atomicNumber}
                        number={element.atomicNumber} 
                        symbol={element.symbol} 
                        name={element.name} 
                        atomicMass={element.atomicMass} ></ElementTile> )}
        
      </React.Fragment>
    </DndProvider>
  )
}

export default App;
