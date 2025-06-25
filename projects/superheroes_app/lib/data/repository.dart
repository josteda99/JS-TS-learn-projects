import 'dart:convert';

import 'package:superheroes_app/data/model/superhero_response.dart';
import 'package:http/http.dart' as http;

class Repository {
  Future<SuperheroResponse?> fetchSuperheroInfo(String name) async {
    final response = await http.get(Uri.parse(""));

    if (response.statusCode == 200) {
      var decodedJson = jsonDecode(response.body);
      SuperheroResponse superheroResponse = SuperheroResponse.fromJson(
        decodedJson,
      );
      return superheroResponse;
    } else {
      return null;
    }
  }
}
