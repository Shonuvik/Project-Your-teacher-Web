import React, {useState, FormEvent} from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import './styles.css';
import Select from '../../components/Select';
import api from '../../services/api';



function TeacherList() {
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        // os parametros so podem ser enviados diretamente no metodo
        //quando a requisição for do tipo post ou put igual o 
        //ocorrido na page TeachForm
        const response = await api.get('classes', {
            params: {
            subject,
            week_day,
            time
            }
        });
        setTeachers(response.data);
    }

    return(
        <div  id="page-teacher-list" className="container"  >
            <PageHeader title="Lista de professores disponíves." >
                <form  id="search-teachers" onSubmit={searchTeachers}>
                <Select 
                    name="subject" 
                    label="Materia"
                    value={subject}
                    onChange={(e) => {setSubject(e.target.value)}} 
                    options={[
                        { value: 'En. Software', label:'En. Software' },
                        { value: 'Full-Stack', label:'Full-Stack' },
                        { value: 'JavaScript', label:'JavaScript' },
                        { value: 'TypeScript', label:'TypeScript' },
                        { value: 'Web Development', label:'Web Development' },
                        { value: 'Mobile Development', label:'Mobile Development' },
                        { value: 'Back-End', label:'Back-End' },
                        { value: 'Front-End', label:'Front-End' },
                        { value: 'Clean Architecture', label:'Clean Architecture' },
                        
                    ]}
                    />
                    <Select 
                    name="week_day" 
                    label="Dia da semana" 
                    value={week_day}
                    onChange={(e) => {setWeekDay(e.target.value)}}
                    options={[
                        { value: '0', label:'Domingo' },
                        { value: '1', label:'Segunda-Feira' },
                        { value: '2', label:'Terça-Feira' },
                        { value: '3', label:'Quarta-Feira' },
                        { value: '4', label:'Quinta-Feira' },
                        { value: '5', label:'Sexta-Feira' },
                        { value: '6', label:'Sabado' },
                        
                        
                    ]}
                    />
                    <Input 
                    type="time" 
                    name="time" 
                    label="Hora" 
                    value={time}
                    onChange={(e) => {
                        setTime(e.target.value)}}
                    /> 

                    <button type="submit" >
                        Buscar
                        </button>
                </form>
            </PageHeader>


            <main>
                {teachers.map(( teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />
                })}
          
            </main>
        </div>
    )
}

export default TeacherList;