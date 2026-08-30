export type Zone = {
  id: string;
  name: string;
  moisture: number; // 0-100
  temperature: number; // °C
  humidity: number; // %
  waterFlow: number; // L/min
  lastIrrigation?: string;
  nextIrrigation?: string | null;
  sensorStatus: "operational" | "warning" | "critical";
};

export type SensorReading = {
  zoneId: string;
  type: "moisture" | "temperature" | "humidity" | "waterFlow";
  value: number;
  timestamp: number;
};

export type WeatherData = {
  temperature: number;
  humidity: number;
  windKph: number;
  rainProbability: number; // 0-100
  forecast: Array<{ time: string; temp: number; rainProb: number }>;
};

export type IrrigationEvent = {
  zoneId: string;
  durationMinutes: number;
  volumeLiters: number;
  time: string;
};

export type AIRecommendation = {
  zoneId: string;
  minutes: number;
  estimatedLiters: number;
  reason: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  potentialSavingPercent?: number;
};

export type AlertItem = {
  id: string;
  level: "INFO" | "WARNING" | "CRITICAL";
  title: string;
  detail?: string;
  time: string;
};

export type DashboardState = {
  zones: Zone[];
  sensors: SensorReading[];
  weather: WeatherData;
  irrigationHistory: IrrigationEvent[];
  recommendations: AIRecommendation[];
  alerts: AlertItem[];
};
