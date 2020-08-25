import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warning from '../../assets/images/icons/warning.svg'

import './styles.css';
import api from '../../services/api';

function TeacherForm() {

    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems ] = useState([
        {week_day: 0, from: '', to: '' }
    ]);


    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            {week_day: 0, from: '', to: '' }
        ]);
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value };
            }

            return scheduleItem;
        });

        setScheduleItems(updatedScheduleItems);
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('/classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro efetuado com sucesso!');

            history.push('/')
        }).catch(() => {
            alert('Erro ao efetuar o cadastro');
        })
    }

    return(
        <div  id="page-teacher-form" className="container"  >
             <PageHeader 
             title="Seja bem vindo como um novo instrutor na Yourteach." 
             description="Preencha o fomulário abaixo para finalizar seu cadastro."
             />

             <main>
                <form onSubmit={handleCreateClass}> 
                 <fieldset>
                     <legend>Seus dados</legend>

                    <Input 
                    name="name" 
                    label="Nome Completo" 
                    value={name} 
                    onChange={(e) => {setName(e.target.value) }} 
                    />
                    <Input 
                    name="avatar" 
                    label="Avatar" 
                    value={avatar}
                    onChange={(e) => {setAvatar(e.target.value)}}
                    />
                    <Input 
                    name="whatsapp" 
                    label="WhatsApp"
                    value={whatsapp}
                    onChange={(e) => {setWhatsapp(e.target.value)}} 
                    />
                    <Textarea 
                    name="bio" 
                    label="Biografia" 
                    value={bio}
                    onChange={(e) => {setBio(e.target.value)}}
                    />
                 </fieldset>

                 <fieldset>
                     <legend>Sobre a aula</legend>

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
                    <Input 
                    name="cost" 
                    label="Custo da Hora" 
                    value={cost}
                    onChange={(e) => {setCost(e.target.value)}}
                    />
        
                 </fieldset>

                    <fieldset>
                        <legend>Horários Disponíveis
                        <button type="button" onClick={addNewScheduleItem} > 
                            +  Novo horário
                        </button>
                        </legend>
                       
                   {scheduleItems.map((scheduleItem, index) => {
                       return (
                        <div key={scheduleItem.week_day} className="schedule-item">
                        <Select 
                        name="week_day" 
                        label="Dia da semana" 
                        value={scheduleItem.week_day}
                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
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
                        name="from" 
                        label="Horário Inicial" 
                        type="time" 
                        value={scheduleItem.from}
                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                        />
                        <Input 
                        name="to" 
                        label="Horário Final" 
                        type="time" 
                        value={scheduleItem.to}
                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                        />
                        </div>
                       );
                   })}

                    </fieldset>

                 <footer>
                     <p>
                         <img src={warning} alt="Avisos" />
                         Importante! <br />
                         Preencha todos os dados
                     </p>
                     <button type="submit">
                         Salvar Cadastro</button>
                 </footer>
                </form> 
             </main>
         </div>
    )
}

export default TeacherForm;