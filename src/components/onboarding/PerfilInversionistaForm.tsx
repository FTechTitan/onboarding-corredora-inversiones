import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PerfilInversionista } from "@/types/onboarding";
import { TrendingDown, TrendingUp, DollarSign, Clock, Brain, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface PerfilInversionistaFormProps {
  data?: PerfilInversionista;
  onNext: (data: PerfilInversionista) => void;
  onBack: () => void;
}

const questions = [
  {
    id: "objetivoInversion",
    title: "¿Cuál es su objetivo principal de inversión?",
    icon: TrendingUp,
    options: [
      { value: "preservacion", label: "Preservar mi capital", risk: 1 },
      { value: "crecimiento-moderado", label: "Crecimiento moderado", risk: 2 },
      { value: "crecimiento-alto", label: "Máximo crecimiento", risk: 3 },
    ],
  },
  {
    id: "horizonteInversion",
    title: "¿Cuánto tiempo planea mantener su inversión?",
    icon: Clock,
    options: [
      { value: "corto", label: "Menos de 1 año", risk: 1 },
      { value: "mediano", label: "1 a 5 años", risk: 2 },
      { value: "largo", label: "Más de 5 años", risk: 3 },
    ],
  },
  {
    id: "toleranciaRiesgo",
    title: "Si su inversión cae un 20%, usted:",
    icon: TrendingDown,
    options: [
      { value: "vender", label: "Vende inmediatamente", risk: 1 },
      { value: "mantener", label: "Mantiene su posición", risk: 2 },
      { value: "comprar", label: "Compra más", risk: 3 },
    ],
  },
  {
    id: "conocimientoMercados",
    title: "¿Cuál es su conocimiento de los mercados financieros?",
    icon: Brain,
    options: [
      { value: "basico", label: "Básico", risk: 1 },
      { value: "intermedio", label: "Intermedio", risk: 2 },
      { value: "avanzado", label: "Avanzado", risk: 3 },
    ],
  },
  {
    id: "experienciaInversiones",
    title: "¿Cuánta experiencia tiene invirtiendo?",
    icon: DollarSign,
    options: [
      { value: "ninguna", label: "Primera vez", risk: 1 },
      { value: "algo", label: "Algunas inversiones", risk: 2 },
      { value: "mucha", label: "Inversionista experimentado", risk: 3 },
    ],
  },
  {
    id: "ingresosMensuales",
    title: "Rango de ingresos mensuales",
    icon: Wallet,
    options: [
      { value: "bajo", label: "Menos de $1.000.000", risk: 1 },
      { value: "medio", label: "$1.000.000 - $3.000.000", risk: 2 },
      { value: "alto", label: "Más de $3.000.000", risk: 3 },
    ],
  },
];

const PerfilInversionistaForm = ({ data, onNext, onBack }: PerfilInversionistaFormProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<PerfilInversionista>(
    data || {
      objetivoInversion: "",
      horizonteInversion: "",
      toleranciaRiesgo: "",
      conocimientoMercados: "",
      experienciaInversiones: "",
      ingresosMensuales: "",
      patrimonio: "",
    }
  );

  const [riskScore, setRiskScore] = useState(0);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const Icon = question.icon;

  const handleAnswer = (questionId: string, value: string, risk: number) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    setRiskScore(riskScore + risk);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => onNext(newAnswers), 300);
    }
  };

  const getRiskProfile = () => {
    if (riskScore <= 8) return { label: "Conservador", color: "text-blue-400", bg: "bg-blue-400/10" };
    if (riskScore <= 14) return { label: "Moderado", color: "text-yellow-400", bg: "bg-yellow-400/10" };
    return { label: "Agresivo", color: "text-red-400", bg: "bg-red-400/10" };
  };

  const profile = getRiskProfile();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Pregunta {currentQuestion + 1} de {questions.length}</span>
          <span>{Math.round(progress)}% completado</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="min-h-[400px] flex flex-col justify-center animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-semibold mb-2">{question.title}</h3>
        </div>

        <div className="space-y-3">
          {question.options.map((option) => {
            const isSelected = answers[question.id as keyof PerfilInversionista] === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleAnswer(question.id, option.value, option.risk)}
                className={cn(
                  "w-full p-6 rounded-lg border-2 transition-all duration-300 hover:scale-105 text-left",
                  isSelected
                    ? "border-primary bg-primary/10 shadow-glow"
                    : "border-border bg-card hover:border-primary/50"
                )}
              >
                <span className={cn("text-lg", isSelected && "text-primary font-medium")}>
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {currentQuestion === questions.length - 1 && riskScore > 0 && (
        <div className={cn("p-6 rounded-lg border-2 border-primary/50 animate-fade-in", profile.bg)}>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Tu perfil de riesgo es:</p>
            <p className={cn("text-3xl font-bold", profile.color)}>{profile.label}</p>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => currentQuestion > 0 ? setCurrentQuestion(currentQuestion - 1) : onBack()}
        >
          Atrás
        </Button>
        {currentQuestion === questions.length - 1 && (
          <Button
            type="button"
            size="lg"
            onClick={() => onNext(answers)}
            className="min-w-[150px]"
          >
            Continuar
          </Button>
        )}
      </div>
    </div>
  );
};

export default PerfilInversionistaForm;
