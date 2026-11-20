export const KOTLIN_SOURCE_CODE = `package com.example.miagenda

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import java.time.LocalDate
import com.example.miagenda.ui.theme.MiAgendaTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MiAgendaTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    MiAgendaScreen()
                }
            }
        }
    }
}

enum class Priority { Baja, Media, Alta }

data class ActivityItem(
    val id: Int,
    val text: String,
    val date: String,
    val priority: Priority,
    var isCompleted: Boolean
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MiAgendaScreen() {
    var textInput by remember { mutableStateOf("") }
    var dateInput by remember { mutableStateOf(LocalDate.now().toString()) }
    var selectedPriority by remember { mutableStateOf(Priority.Media) }
    var searchQuery by remember { mutableStateOf("") }
    var activities by remember { mutableStateOf(listOf<ActivityItem>()) }
    var errorMessage by remember { mutableStateOf(false) }
    var nextId by remember { mutableStateOf(1) }

    var editingActivity by remember { mutableStateOf<ActivityItem?>(null) }
    var editText by remember { mutableStateOf("") }
    var editDate by remember { mutableStateOf("") }

    val filteredActivities = activities.filter { item ->
        item.text.contains(searchQuery, ignoreCase = true)
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Mi Agenda") },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primaryContainer,
                    titleContentColor = MaterialTheme.colorScheme.onPrimaryContainer
                )
            )
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            OutlinedTextField(
                value = textInput,
                onValueChange = { 
                    textInput = it
                    if (errorMessage) errorMessage = false
                },
                label = { Text("Escribe una actividad") },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true,
                isError = errorMessage
            )

            if (errorMessage) {
                Text(
                    text = "Por favor, debes escribir una actividad.",
                    color = MaterialTheme.colorScheme.error,
                    style = MaterialTheme.typography.bodySmall
                )
            }

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                OutlinedTextField(
                    value = dateInput,
                    onValueChange = { dateInput = it },
                    label = { Text("Fecha") },
                    modifier = Modifier.weight(1.0f),
                    singleLine = true
                )
            }

            Button(
                onClick = {
                    if (textInput.isBlank()) {
                        errorMessage = true
                    } else {
                        errorMessage = false
                        val finalDate = if (dateInput.isBlank()) LocalDate.now().toString() else dateInput.trim()
                        activities = activities + ActivityItem(nextId, textInput.trim(), finalDate, selectedPriority, false)
                        nextId++
                        textInput = ""
                        dateInput = LocalDate.now().toString()
                    }
                },
                modifier = Modifier.fillMaxWidth().height(48.dp)
            ) {
                Text("Agregar actividad")
            }

            // Barra de búsqueda en tiempo real
            OutlinedTextField(
                value = searchQuery,
                onValueChange = { searchQuery = it },
                label = { Text("Buscar actividad...") },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true
            )

            LazyColumn(
                modifier = Modifier.fillMaxSize(),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(filteredActivities, key = { it.id }) { activity ->
                    ActivityRow(
                        activity = activity,
                        onCheckedChange = { checked ->
                            activities = activities.map {
                                if (it.id == activity.id) it.copy(isCompleted = checked) else it
                            }
                        },
                        onEdit = {
                            editingActivity = activity
                            editText = activity.text
                            editDate = activity.date
                        },
                        onDelete = {
                            activities = activities.filter { it.id != activity.id }
                        }
                    )
                }
            }
        }
    }
}`;
