export const calculationTypes = [
  'Coefficient of Lift',
  'Coefficient of Drag',
  'Thrust Required',
  'Power Required',
  'Thrust Required Minimum',
  'Power Required Minimum'
] as const;

export const inputMappings = {
  'coefficient_of_lift': ['velocity', 'weight', 'density', 'wing_area'],
  'coefficient_of_drag': ['coefficient_of_lift', 'profile_drag', 'efficiency', 'aspect_ratio'],
  'thrust_required': ['weight', 'coefficient_of_lift', 'coefficient_of_drag'],
  'power_required': ['thrust_required', 'coefficient_of_lift', 'weight', 'density', 'wing_area'],
  'thrust_required_minimum': ['weight', 'profile_drag', 'efficiency', 'aspect_ratio'],
  'power_required_minimum': ['weight', 'density', 'wing_area', 'profile_drag', 'efficiency', 'aspect_ratio']
} as const;