import { AircraftInputs } from './types';

export class PerformanceCalculator {
  private readonly pi: number = Math.PI;

  coefficientOfLift(inputs: AircraftInputs): number {
    return (2 * inputs.weight) / (inputs.density * Math.pow(inputs.velocity, 2) * inputs.wing_area);
  }

  coefficientOfDrag(cl: number, inputs: AircraftInputs): number {
    if (!inputs.efficiency || !inputs.aspect_ratio || !inputs.profile_drag) {
      throw new Error('Missing required inputs for coefficient of drag calculation');
    }
    return inputs.profile_drag + (Math.pow(cl, 2)) / (this.pi * inputs.efficiency * inputs.aspect_ratio);
  }

  thrustRequired(cl: number, cd: number, weight: number): number {
    return weight / (cl/cd);
  }

  powerRequired(tr: number, inputs: AircraftInputs, cl: number): number {
    return tr * Math.sqrt((2 * inputs.weight) / (inputs.density * inputs.wing_area * cl));
  }

  thrustRequiredMinimum(inputs: AircraftInputs): number {
    if (!inputs.efficiency || !inputs.aspect_ratio || !inputs.profile_drag) {
      throw new Error('Missing required inputs for minimum thrust calculation');
    }
    const k = 1 / (this.pi * inputs.efficiency * inputs.aspect_ratio);
    return inputs.weight / Math.sqrt(1 / (4 * inputs.profile_drag * k));
  }

  powerRequiredMinimum(inputs: AircraftInputs): number {
    if (!inputs.efficiency || !inputs.aspect_ratio || !inputs.profile_drag) {
      throw new Error('Missing required inputs for minimum power calculation');
    }
    return (4/3) * inputs.weight * Math.sqrt(
      ((2 * inputs.weight) / (inputs.density * inputs.wing_area)) * 
      ((Math.sqrt(3 * inputs.profile_drag * Math.pow(this.pi * inputs.efficiency * inputs.aspect_ratio, 3)))/
       (Math.pow(this.pi * inputs.efficiency * inputs.aspect_ratio, 3)))
    );
  }
}