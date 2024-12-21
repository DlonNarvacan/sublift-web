export interface BaseAircraftInputs {
    velocity: number;
    weight: number;
    density: number;
    wing_area: number;
  }
  
  export interface AircraftInputs extends BaseAircraftInputs {
    profile_drag?: number;
    efficiency?: number;
    aspect_ratio?: number;
    coefficient_of_lift?: number;
    coefficient_of_drag?: number;
    thrust_required?: number;
  }
  
  export type CalculationType = 
    | 'coefficient_of_lift'
    | 'coefficient_of_drag'
    | 'thrust_required'
    | 'power_required'
    | 'thrust_required_minimum'
    | 'power_required_minimum';