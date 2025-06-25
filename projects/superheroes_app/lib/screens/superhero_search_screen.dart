import 'package:flutter/material.dart';
import 'package:superheroes_app/data/model/superhero_detail._response.dart';
import 'package:superheroes_app/data/model/superhero_response.dart';
import 'package:superheroes_app/data/repository.dart';
import 'package:superheroes_app/screens/superhero_detail_screen.dart';

class SuperheroSearchScreen extends StatefulWidget {
  const SuperheroSearchScreen({super.key});

  @override
  State<SuperheroSearchScreen> createState() => _SuperheroSearchScreenState();
}

class _SuperheroSearchScreenState extends State<SuperheroSearchScreen> {
  Future<SuperheroResponse?>? _superheroInfo;
  Repository repository = Repository();
  bool _isTextEmpty = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Superhero search")),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              decoration: InputDecoration(
                hintText: "Busca un superhero",
                prefixIcon: Icon(Icons.search),
                border: OutlineInputBorder(),
              ),
              onChanged: (text) {
                setState(() {
                  _isTextEmpty = text.isEmpty;
                  _superheroInfo = repository.fetchSuperheroInfo(text);
                });
              },
            ),
          ),
          bodyList(_isTextEmpty),
        ],
      ),
    );
  }

  FutureBuilder<SuperheroResponse?> bodyList(bool isTextEmpty) {
    return FutureBuilder(
      future: _superheroInfo,
      builder: (context, snapshot) {
        if (isTextEmpty) return Center(child: Text("Introduce un nombre"));
        if (snapshot.connectionState == ConnectionState.waiting) {
          return CircularProgressIndicator();
        } else if (snapshot.hasError) {
          return Text("Error: ${snapshot.error}");
        } else if (snapshot.hasData) {
          var superheroList = snapshot.data?.result;
          return Expanded(
            child: ListView.builder(
              itemCount: superheroList?.length ?? 0,
              itemBuilder: (context, index) {
                if (superheroList != null) {
                  return ItemSuperhero(superheroList[index]);
                } else {
                  return Text("error");
                }
              },
            ),
          );
        } else {
          return Text("No result");
        }
      },
    );
  }

  Padding ItemSuperhero(SuperheroDetailResponse item) => Padding(
    padding: const EdgeInsets.only(top: 8, bottom: 8, left: 16, right: 16),
    child: GestureDetector(
      onTap: () => Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => SuperheroDetailScreen(superhero: item),
        ),
      ),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          color: const Color.fromARGB(255, 190, 190, 190),
        ),
        child: Column(
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(16),
              child: Image.network(
                item.url,
                height: 250,
                width: double.infinity,
                fit: BoxFit.cover,
                alignment: Alignment.center,
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                item.name,
                style: TextStyle(fontSize: 28, fontWeight: FontWeight.w300),
              ),
            ),
          ],
        ),
      ),
    ),
  );
}
