import { View, Text, FlatList, TextInput, Button, TouchableHighlight, Alert } from "react-native";
import { useEffect, useState } from "react";
import { query, collection, getDocs, addDoc, doc, setDoc, deleteDoc } from "firebase/firestore"

import Checkbox from 'expo-checkbox';

import { firestore } from '../firebase'

import { styles } from './styles'

const MainScreen = () => {
    const [tarefas, setarefas] = useState([])
    const [tarefaEmEdicao, setTarefaEmEdicao] = useState([{ id: 0, rotulo: '' }])
    const [isChecked, setChecked] = useState(false);

    function setCheckbox(id) {
        let list = []
        checked.forEach((item) => {
            if (item.id === id) {
                list.push({ id: item.id, rotulo: item.rotulo, checked: item.checked })
            } else {
                list.push(item)
            }
        })

        setChecked(list)
    }

    async function loadTarefas() {
        try {
            const q = query(collection(firestore, "tarefas"))
            const queryResult = await getDocs(q)
            let items = []
            queryResult.forEach((doc) => {
                items.push({
                    id: doc.id,
                    rotulo: doc.data().rotulo,
                    status: doc.data().status
                })
            })
            setarefas(items)
        } catch (error) {
            console.log(error)
        }
    }

    async function limpaTarefaEmEdicao() {
        setTarefaEmEdicao({ id: 0, rotulo: '' })
    }

    async function saveTarefa() {

        if (tarefaEmEdicao.id === 0) {
            await addDoc(collection(firestore, "tarefas"), { rotulo: tarefaEmEdicao.rotulo, status: false })
        } else {
            await setDoc(doc(firestore, "tarefas", tarefaEmEdicao.id), { rotulo: tarefaEmEdicao.rotulo }, { merge: true })
            console.log(tarefaEmEdicao.id)
        }
        loadTarefas()
        limpaTarefaEmEdicao()
    }

    function deleteTarefa(tarefa) {
        Alert.alert('Remover Tarefa', "Tem certeza que deseja remover a tarefa: '" + tarefa.rotulo + "'", [
            { text: 'Cancelar' },
            {
                text: 'Remover',
                onPress: async () => {
                    try {
                        await deleteDoc(doc(firestore, "tarefas", tarefa.id))
                        loadTarefas()
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        ])
    }

    useEffect(() => {
        loadTarefas()
    }, [])

    return (
        <View style={styles.container}>
            <View>
                <Text>Tarefa:</Text>
                <TextInput style={styles.input} value={tarefaEmEdicao.rotulo} placeholder="Digite uma nova tarefa"
                    onChangeText={text => setTarefaEmEdicao({ id: tarefaEmEdicao.id, rotulo: text })} />
            </View>

            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button title="Limpar" onPress={() => limpaTarefaEmEdicao()} />
                </View>
                <View style={styles.button}>
                    <Button title="Salvar" onPress={() => saveTarefa()} />
                </View>
            </View>

            <View style={styles.task}>
                <FlatList data={tarefas} renderItem={({ item }) =>
                    <TouchableHighlight onPress={() => setTarefaEmEdicao(item)} onLongPress={() => deleteTarefa(item)}>
                        <View style={styles.chkContainer}>
                            <Checkbox style={styles.chk} value={isChecked} onValueChange={(setChecked)} color={isChecked ? '#4630EB' : undefined} />

                            <Text style={styles.task} >{item.rotulo}</Text>
                        </View>
                    </TouchableHighlight>} keyExtractor={item => item.id} />
            </View>
        </View>
    )
}

export default MainScreen