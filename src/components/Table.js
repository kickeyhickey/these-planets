import React, { Component } from 'react'
import { Table } from 'reactstrap'
import Loading from './Loading'


export default class table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      planetsArray:[],
      loading: false,
      notLoaded: "LOADING"
    }

  }

  componentDidMount(){
    this.readPlanets()
  }

  readPlanets = async () => {
   try {
    const response = await fetch("https://swapi.dev/api/planets/")
    const planets = await response.json();
    this.setState({ planetsArray: planets.results, loading:true});
   } catch (error) {
    console.error(error);
   }
  }

  getSurfaceArea = (diameter, surfaceWater) => {
    let surfaceArea = 4 * Math.PI * (diameter/2) ** 2
    let surfaceAreaWater = parseFloat(surfaceWater) / 100
   return  surfaceWater !== 'unknown' ? Math.round(surfaceArea * surfaceAreaWater) : "unknown"
  }

  
  ascOrder = (name) => {
    let ascName = name.sort()
    return ascName
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
          {this.state.loading === false ? <Loading /> : this.state.planetsArray.map(planet => {
            return (
              <tbody>
                <tr>
                  <th>
                    {planet.name}
                  </th>
                  <th>
                    {planet.climate}
                  </th>
                  <th>
                    {planet.population}
                  </th>
                  <th>
                    {planet.terrain}
                  </th>
                  <th>
                  {this.getSurfaceArea(planet.diameter, planet.surface_water)}
                  </th>
                    
                </tr>
              </tbody>
            )
          })}
        </Table>
    </div>
    )
  }
}
