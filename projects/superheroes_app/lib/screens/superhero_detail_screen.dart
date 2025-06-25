import 'package:flutter/material.dart';
import 'package:superheroes_app/data/model/superhero_detail._response.dart';

class SuperheroDetailScreen extends StatelessWidget {
  final SuperheroDetailResponse superhero;
  const SuperheroDetailScreen({super.key, required this.superhero});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Superhero: ${superhero.name}")),
      body: Column(
        children: [
          Image.network(
            superhero.url,
            height: 300,
            width: double.infinity,
            fit: BoxFit.cover,
            alignment: Alignment.center,
          ),
          Text(superhero.name, style: TextStyle(fontSize: 28)),
          Text(
            superhero.realName,
            style: TextStyle(fontSize: 18, fontStyle: FontStyle.italic),
          ),
          Expanded(
            child: SizedBox(
              width: double.infinity,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Column(
                    children: [
                      Container(
                        height: double.parse(
                          superhero.powerStatsResponse.power,
                        ),
                        width: 20,
                        color: Colors.amberAccent,
                      ),
                      Text("Power"),
                    ],
                  ),
                  Column(
                    children: [
                      Container(
                        height: double.parse(
                          superhero.powerStatsResponse.strength,
                        ),
                        width: 20,
                        color: Colors.red,
                      ),
                      Text("strength"),
                    ],
                  ),
                  Column(
                    children: [
                      Container(
                        height: double.parse(
                          superhero.powerStatsResponse.intelligence,
                        ),
                        width: 20,
                        color: Colors.blue,
                      ),
                      Text("intelligence"),
                    ],
                  ),
                  Column(
                    children: [
                      Container(
                        height: double.parse(
                          superhero.powerStatsResponse.speed,
                        ),
                        width: 20,
                        color: Colors.green,
                      ),
                      Text("speed"),
                    ],
                  ),
                  Column(
                    children: [
                      Container(
                        height: double.parse(
                          superhero.powerStatsResponse.durability,
                        ),
                        width: 20,
                        color: Colors.amberAccent,
                      ),
                      Text("durability"),
                    ],
                  ),
                  Column(
                    children: [
                      Container(
                        height: double.parse(
                          superhero.powerStatsResponse.combat,
                        ),
                        width: 20,
                        color: Colors.orange,
                      ),
                      Text("combat"),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
