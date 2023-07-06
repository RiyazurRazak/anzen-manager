class PasswordLabel {
  PasswordLabel({
    required this.label,
    required this.id,
    required this.icon,
  });

  final String? label;
  final String? id;
  final String? icon;

  factory PasswordLabel.fromJson(Map<String, dynamic> json) {
    return PasswordLabel(
      label: json["label"],
      id: json["id"],
      icon: json["icon"],
    );
  }
}

/*
[
	{
		"label": "giphy",
		"id": "83f5a38a-f7b8-4bc3-ad05-6539182e1b3d"
	}
]*/