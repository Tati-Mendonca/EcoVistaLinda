import { TimelineData } from "@/types";

export const sortServices = (services: TimelineData[]): TimelineData[] => {
  if (!services || services.length === 0) return [];

  return [...services].sort((a, b) => {
  
    const scheduleFirst = a.calculatedDates && a.calculatedDates.length > 0;
    const scheduleSecond = b.calculatedDates && b.calculatedDates.length > 0;
    if (scheduleFirst && !scheduleSecond) return -1;
    if (!scheduleFirst && scheduleSecond) return 1;

    const priorityAppointment = (name: string) => {
      const normalizedName = name.toLowerCase();
      if (normalizedName.includes("comum")) return 1;    
      if (normalizedName.includes("reciclável") || normalizedName.includes("reciclavel")) return 2;                                       
      if (normalizedName.includes("bagulho")) return 3;  
      return 4;                                         
    };

    return priorityAppointment(a.name) - priorityAppointment(b.name);
  });
};