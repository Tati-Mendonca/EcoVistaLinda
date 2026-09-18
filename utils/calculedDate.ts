export const calculedNextDates = (daysOfWeek: number[], index =3): string[] =>{
    if(!daysOfWeek || daysOfWeek.length === 0) return []

    const nextDates: string[] = []
    const today = new Date()

    for (let i = 0; i < 30; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() + ( i + 1 ))
        
        if (daysOfWeek.includes(date.getDay())) {
            
            const formattedDate = date.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            })

            nextDates.push(formattedDate)

            if(nextDates.length === index) break;
        }
    }

    return nextDates;
}