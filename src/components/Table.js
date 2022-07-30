import React, { Component } from 'react'
import { Table } from 'reactstrap'
import Loading from './Loading'


export default class table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      planetsArray:[],
      loading: false,
      planetsName: []
    }
  }

  componentDidMount(){
    this.readPlanets()
  }

  readPlanets = async () => {
   try {
    const response = await fetch("https://swapi.dev/api/planets/")
    const planets = await response.json();
    this.setState({ planetsArray: planets.results.sort((a,b) => a.name > b.name), loading:true});
   } catch (error) {
    console.error(error);
   }
  }

  getSurfaceArea = (diameter, surfaceWater) => {
    let surfaceArea = 4 * Math.PI * (diameter/2) ** 2
    let surfaceAreaWater = parseFloat(surfaceWater) / 100
    console.log(typeof surfaceArea)
    return surfaceWater !== 'unknown' ? this.numberSpacing(Math.round(surfaceArea * surfaceAreaWater)) : "unknown"
    
  }

  numberSpacing = (number) => {
    let betterNumber = number.toString()
    return betterNumber.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
    
  }


  render() {
    return (
      <div>
        <Table bordered>
          <thead>
            <tr>
              <th>
                Name
              </th>
              <th>
                Climate
              </th>
              <th>
                Population
              </th>
              <th>
                Terrain
              </th>
              <th>
                Surface Area
              </th>
            </tr>
          </thead>
          {this.state.loading === false ? <Loading /> : this.state.planetsArray.map((planet, id) => {
            return (
              <tbody key={id}>
                <tr>
                  <th>
                    <a href={planet.url} >
                    {planet.name}
                    </a>
                  </th>
                  <td>
                    {planet.climate}
                  </td>
                  <td>
                    {this.numberSpacing(planet.population)}
                  </td>
                  <td>
                    {planet.terrain}
                  </td>
                  <td>
                  {this.getSurfaceArea(planet.diameter, planet.surface_water)}
                  </td>
                </tr>
              </tbody>
            )
          })}
        </Table>
    </div>
    )
  }
}
