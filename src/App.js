import React, {useState, useEffect, ReactFragment} from 'react';
import './App.css';
import elements from './elements.json';
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

// TODO: Drag and drop shows a pointer, allows dirty cheaters, dirty dirty cheaters, hate them

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}


const Slot = (props) => {
  const { number, state, setState, incrementMissed } = props; 
  const { height, width } = useWindowDimensions();
  const size = `${Math.min(height, width) * .05}px`

  if (!state) {
    throw `blah ${number}`
  }

  const [{ isOver }, drop] = useDrop({
    accept: "TILE",
    //drop: () => moveKnight(x, y),
    canDrop: (item, monitor) => {
      return true
      // console.log(JSON.stringify(item))
      // return (item.number == number)
    },
    drop: (item, monitor) => {
      if (item.number == number) {
        let newState = [...state]
        newState[number-1] = true
        setState(newState)
      } else {
        incrementMissed()
      }
      
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
          style={{width: size, 
                  height: size, 
                  border: '2px solid black', 
                  margin: "1px", 
                  display: 'inline-block',
                  background: '#9fa1d4',
                  overflow: 'hidden',
                  textAlign: "center"}}>
        <div style={{fontSize: '2vw'}}>{elementData.symbol}</div>
        <div style={{fontSize: '.7vw'}}>{elementData.name}</div>
      </div>
    )
  } else {
    return (
      <div ref={drop}  
          style={{width: size, 
                  height: size, 
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
          </div>
      </div>
    )
  }
 
}

const Spacer = () => {
  const { height, width } = useWindowDimensions();
  const size = `${Math.min(height, width) * .05}px`;
  return (
    <div style={{width: size, 
                height: size,
                border: '2px solid white', 
                margin: "1px", 
                display: 'inline-block',
                background: "#fff",
                overflow: 'hidden',
            }}>
    </div>
  ) 
}



const ElementTile = (props) => {
  const { number, symbol, name, atomicMass } = props; 
  const { height, width } = useWindowDimensions();
  const size = `${Math.min(height, width) * .05}px`;
  const [ {isDragging}, drag] = useDrag({
    item: { type: 'TILE', number: number },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
  })
  return (
    <div ref={drag} 
        style={{width: size, 
                height: size, 
                border: '2px solid black', 
                margin: "1px", 
                display: 'inline-block',
                background: '#9fa1d4',
                textAlign: "center",
                opacity: isDragging ? 0.5 : 1}}>

      <div style={{fontSize: '3vh'}}>{symbol}</div>
      <div style={{fontSize: '1.2vh'}}>{name}</div>
    </div>
  )
}

const SlotRow = (props) => {
  const { from, to, state, setState, incrementMissed} = props;
  let boxes = [];
  for (let i=from; i <= to; i++) {
    boxes.push(<Slot key={i} number={i} state={state} setState={setState} incrementMissed={incrementMissed}/>)
  }
  return boxes;
}

const SpacerRow = (props) => {
  let boxes = [];
  for (let i=0; i < props.count; i++) {
    boxes.push(<Spacer key={i} />)
  }
  return boxes;
}

const PeriodicTableSlots = ({state, setState, incrementMissed}) => {
  return (
    <div style={{textAlign: 'center'}}>
      <div>
        <Slot number={1} state={state} setState={setState} incrementMissed={incrementMissed}/>
        <SpacerRow count={16} state={state} setState={setState}/>
        <Slot number={2} state={state} setState={setState} incrementMissed={incrementMissed}/>
      </div>
      <div>
        <SlotRow from={3} to={4} state={state} setState={setState} incrementMissed={incrementMissed}/>
        <SpacerRow count={10} state={state} setState={setState}/>
        <SlotRow from={5} to={10} state={state} setState={setState} incrementMissed={incrementMissed}/>
      </div>
      <div>
        <SlotRow from={11} to={12} state={state} setState={setState} incrementMissed={incrementMissed}/>
        <SpacerRow count={10} state={state} setState={setState}/>
        <SlotRow from={13} to={18} state={state} setState={setState} incrementMissed={incrementMissed}/>
      </div>
      <div>
        <SlotRow from={19} to={36} state={state} setState={setState} incrementMissed={incrementMissed}/>
      </div>
      <div>
        <SlotRow from={37} to={54} state={state} setState={setState} incrementMissed={incrementMissed}/>
      </div>
      <div>
        <SlotRow from={55} to={56} state={state} setState={setState} incrementMissed={incrementMissed}/>
        <Spacer />
        <SlotRow from={72} to={86} state={state} setState={setState} incrementMissed={incrementMissed}/>
      </div>
      <div>
        <SlotRow from={87} to={88} state={state} setState={setState} incrementMissed={incrementMissed}/>
        <Spacer />
        <SlotRow from={104} to={118} state={state} setState={setState} incrementMissed={incrementMissed}/>
      </div>
      <div>
        <Spacer />
      </div>
      <div>
      <Spacer />
        <Spacer />
        <Spacer />
        <SlotRow from={57} to={71} state={state} setState={setState} incrementMissed={incrementMissed}/>
      </div>
     
      <div>
        <Spacer />
        <Spacer />
        <Spacer />
        <SlotRow from={89} to={103} state={state} setState={setState} incrementMissed={incrementMissed}/>
      </div>
    </div>
  );
}



const App = () => {
  const [table, setTable] = useState(elements.map((x) => {return false}))
  const [missed, setMissed] = useState(0)
  const correct = table.filter(x => x == true).length
  
  const incrementMissed = () => setMissed(missed+1) 
  const reset = () => {
    setTable(elements.map((x) => {return false}))
    setMissed(0)
  }
  
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
        <table>
          <tr style={{background: 'green', color: 'white'}}>
            <td>Correct</td>
            <td>{correct}</td>
          </tr>
          <tr style={{background: 'red', color: 'white'}}>
            <td >Missed</td>
            <td>{missed}</td>
          </tr>
          
        </table>
        <button onClick={reset}>Reset</button>
        <PeriodicTableSlots state={table} setState={setTable} incrementMissed={incrementMissed}></PeriodicTableSlots>
        <div>
          {options.map((element) => 
            <ElementTile  key={element.atomicNumber}
                        number={element.atomicNumber} 
                        symbol={element.symbol} 
                        name={element.name} 
                        atomicMass={element.atomicMass} ></ElementTile> )}
        </div>
      </React.Fragment>
    </DndProvider>
  )
}

export default App;
